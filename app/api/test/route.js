export async function GET() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    return Response.error({ status: 500, message: 'No API URL provided' })
  }
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()
  return Response.json(data)
}