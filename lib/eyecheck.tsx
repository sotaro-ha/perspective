import { button, useControls } from 'leva';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { css } from '@emotion/css';
import { Camera } from '@mediapipe/camera_utils';
import {
	FaceMesh, FACEMESH_LEFT_EYE, FACEMESH_LIPS, FACEMESH_RIGHT_EYE, Results , NormalizedLandmarkListList
} from '@mediapipe/face_mesh';
import { draw } from '../utils/drawCanvas';

// EARの閾値
const EAR_THRESHOLD_CLOSE = 1.4  // 目が閉じていると判断する閾値
const EAR_THRESHOLD_OPEN = 1.2   // 目が開いていると判断する閾値

// 眼のアスペクト比を計算する関数
const calculateEyeRatio = (faceLandmarks: any , eyeLandmarks: number[]) => {
    const eyePoints = eyeLandmarks.map(i => [faceLandmarks[i].x, faceLandmarks[i].y]);
    const A = Math.hypot(eyePoints[1][0] - eyePoints[5][0], eyePoints[1][1] - eyePoints[5][1]);
    const B = Math.hypot(eyePoints[2][0] - eyePoints[4][0], eyePoints[2][1] - eyePoints[4][1]);
    const C = Math.hypot(eyePoints[0][0] - eyePoints[3][0], eyePoints[0][1] - eyePoints[3][1]);
    const eyeRatio = (A + B) / (2.0 * C);
    return eyeRatio;
};

export const App: FC = () => {
	const webcamRef = useRef<Webcam>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const resultsRef = useRef<Results>()

	// コントローラーの追加
	const datas = useControls({
		bgImage: false,
		landmark: {
			min: 0,
			max: 477,
			step: 1,
			value: 0
		},
		result: button(() => {
			OutputData()
		})
	})

	/** 検出結果をconsoleに出力する */
	const OutputData = () => {
		const results = resultsRef.current!;
		console.log(results.multiFaceLandmarks[0])
		console.log('FACEMESH_LEFT_EYE', FACEMESH_LEFT_EYE)
		console.log('FACEMESH_RIGHT_EYE', FACEMESH_RIGHT_EYE)
		console.log('FACEMESH_LIPS', FACEMESH_LIPS)

		if (results.multiFaceLandmarks) {
			for (const faceLandmarks  of results.multiFaceLandmarks) {
				const leftEyeRatio = calculateEyeRatio(faceLandmarks, [33, 246, 161, 160, 159, 158]);
				const rightEyeRatio = calculateEyeRatio(faceLandmarks, [263, 466, 388, 387, 386, 385]);

				//  眼の状態を追跡する変数
				let eyeOpen = true;

				if (leftEyeRatio > EAR_THRESHOLD_CLOSE && rightEyeRatio > EAR_THRESHOLD_CLOSE) {
					eyeOpen = false;
					console.log("Eyes closed");
				} else if (leftEyeRatio < EAR_THRESHOLD_OPEN || rightEyeRatio < EAR_THRESHOLD_OPEN) {
					eyeOpen = true;
					console.log("Eyes opened");
				}
			}
		}
	}

	/** 検出結果（フレーム毎に呼び出される） */
	const onResults = useCallback(
		(results: Results) => {
			// 検出結果の格納
			resultsRef.current = results
			// 描画処理
			const ctx = canvasRef.current!.getContext('2d')!
			draw(ctx, results, datas.bgImage, datas.landmark)
		},
		[datas]
	)

	useEffect(() => {
		const faceMesh = new FaceMesh({
			locateFile: file => {
				return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
			}
		})

		faceMesh.setOptions({
			maxNumFaces: 1,
			refineLandmarks: true, // landmarks 468 -> 478
			minDetectionConfidence: 0.5,
			minTrackingConfidence: 0.5
		})

		faceMesh.onResults(onResults)

		if (webcamRef.current) {
			const camera = new Camera(webcamRef.current.video!, {
				onFrame: async () => {
					await faceMesh.send({ image: webcamRef.current!.video! })
				},
				width: 1280,
				height: 720
			})
			camera.start()
		}

		return () => {
			faceMesh.close()
		}
	}, [onResults])

	return (
		<div className={styles.container}>
			{/* capture */}
			<Webcam
				ref={webcamRef}
				style={{ visibility: 'hidden' }}
				audio={false}
				width={1280}
				height={720}
				mirrored
				screenshotFormat="image/jpeg"
				videoConstraints={{ width: 1280, height: 720, facingMode: 'user' }}
			/>
			{/* draw */}
			<canvas ref={canvasRef} className={styles.canvas} width={1280} height={720} />
		</div>
	)
}

// ==============================================
// styles

const styles = {
	container: css`
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	`,
	canvas: css`
		position: absolute;
		width: 1280px;
		height: 720px;
		background-color: #1e1e1e;
		border: 1px solid #fff;
	`
}
