export async function POST(request: Request) {
  const { query } = await request.json()

  const response = await fetch(
    "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/paraphrase-multilingual-mpnet-base-v2",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: query }),
    }
  )

  const embedding = await response.json()
  return Response.json({ embedding })
}
