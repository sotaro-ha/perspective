# Prismatic Diary

## セットアップ

1. raspberry pi4つと貸与PC(windows)をイーサネットワークのハブや各電源，出力機器に接続
2. 各デバイスの起動後，以下のコマンドで，ipアドレスを確認

```sh
ifconfig (raspberry pi)
ipconfig (windows)
```

出力結果として以下のようになっていることを確認してください

> 192.168.0.101 ~ 104 (raspberry pi)
> 192.168.0.105 (windows) 3. pingコマンドにより接続を確認

```sh
ping 192.168.0.105
```

特に，windows PC(105)に対して接続できることを確認してください．接続ができない場合にはファイヤウォールの設定を変更する必要がありますので[こちら](https://atmarkit.itmedia.co.jp/ait/articles/1712/21/news018.html)を参考にして設定を変更してください．4. windows PCにおいて利用するディレクトリは以下になります

-   /Downloads/prismatic-frontend
    -   フロントエンドのコード(このレポジトリ)
-   /Downloads/prismatic-socket
    -   ソケットサーバ用のコードです([こちら](https://github.com/hrm1810884/prismatic-diary-socket)のレポジトリ)

## 始め方

1. frontendディレクトリで以下のコマンドによりクライアントサーバを立てます．

    ```sh
    yarn install
    yarn dev
    ```

    サーバはwindows PC (ユーザが利用)と4つのraspberry piのアクセスする合計5つのサーバを立ててください．サーバはそれぞれ(port: 3000, 3001, 3002, 3003, 3004)に立ちます．

2. socketディレクトリで以下のコマンドによりソケットサーバを立ち上げます．

    ```sh
    yarn start
    ```

3. 各デバイスでクライアントサーバに接続
   デバイスごとの接続先は以下になります．

    > windows : http://192.168.0.105:3000
    > raspberry pi 1: http://192.168.0.105:3001/receiver/0
    > raspberry pi 2: http://192.168.0.105:3002/receiver/1
    > raspberry pi 3: http://192.168.0.105:3003/receiver/2
    > raspberry pi 4: http://192.168.0.105:3004/receiver/3

4. windows PCから日記入力 -> 出力確認
