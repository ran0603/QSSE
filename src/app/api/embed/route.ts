export async function POST(request: Request) {
  const data = await request.json()

  if (data.error) {
    throw new Error(data.error)  // Or handle gracefully
  }

  const response = await fetch(
    "https://router.huggingface.co/hf-inference/models/sentence-transformers/paraphrase-multilingual-mpnet-base-v2/pipeline/sentence-similarity",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: data.query }),
    }
  )

  const embedding = await response.json()
  return Response.json({ embedding })
}
