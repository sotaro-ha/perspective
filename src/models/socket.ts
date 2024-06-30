import { breakChar } from "@/utils";

export type StreamerText = string;
export type ReceiverText = string[];

export type StreamerSocketMessage = {
    text: StreamerText;
    cursorPosition: number;
};

export type ReceiverSocketMessage = {
    text: ReceiverText;
    inputIndex: number;
};

export const convertStreamerTextToReceiverText = (streamerText: StreamerText): ReceiverText => {
    return streamerText.split(breakChar);
};

export const convertSocketMessage = (
    socketMessage: StreamerSocketMessage
): ReceiverSocketMessage => {
    const { text: streamerText, cursorPosition } = socketMessage;
    const receiverText = convertStreamerTextToReceiverText(streamerText);

    const inputIndex = receiverText.findIndex(
        (str, idx) => receiverText.slice(0, idx + 1).join("").length >= cursorPosition
    );

    return {
        text: receiverText,
        inputIndex,
    };
};
