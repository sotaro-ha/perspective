export async function GET(req) {
    const url = process.env.API_URL
    const res = await fetch(url)
    const status = res.status;
    const OPENAIAPI_TESTRESULT = res.OPENAIAPI_TestResult
    return { status: status, body: OPENAIAPI_TESTRESULT }
}