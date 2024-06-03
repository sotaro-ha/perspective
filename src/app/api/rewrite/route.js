export async function POST(request) {
    // request.json() は非同期関数なので、awaitを使用して呼び出します。
    const { content } = await request.json();
    console.log(content);

    //環境変数からAPI URLを取得
    const url = process.env.NEXT_PUBLIC_API_URL + "/rewrite";
    if (!url) {
        // 正しい形式でエラーレスポンスを返す
        return new Response(JSON.stringify({ status: 500, message: 'No API URL provided' }), { status: 500 });
    }

    // APIにリクエストを送信
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: content })
    });

    // レスポンスのJSONを解析
    const data = await res.json();
    // for test
    //const data = { content: content };

    // 正しい形式でJSONレスポンスを返す
    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
}


export async function GET(request) {
    const { content } = await request.json();

    //環境変数からAPI URLを取得
    const url = process.env.NEXT_PUBLIC_API_URL + "/rewrite";
    if (!url) {
        // 正しい形式でエラーレスポンスを返す
        return new Response(JSON.stringify({ status: 500, message: 'No API URL provided' }), { status: 500 });
    }

    // APIにリクエストを送信
    const res = await fetch(url + content, {method: 'GET'});

    // レスポンスのJSONを解析
    const data = await res.json();
    // for test
    //const data = { content: content };

    // 正しい形式でJSONレスポンスを返す
    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

