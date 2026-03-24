import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
)

export async function POST(request: Request) {
  const { query, filters = {} } = await request.json()

  // Step 1: Get query embedding
  const embedRes = await fetch(`${process.env.APP_URL}/api/embed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  })
  const { embedding } = await embedRes.json()

  // Step 2: Run vector similarity search with filters
  const { data, error } = await supabase.rpc("search_ayaat", {
    query_embedding: [
      ...embedding,
      ...Array(768 - embedding.length).fill(0.0)
    ],
    filter_surah: filters.surah ?? null,
    filter_juz: filters.juz ?? null,
    filter_theme: filters.theme ?? null,
    filter_root: filters.root ?? null,
    match_count: 10,
  })

  if (error) return Response.json({ error }, { status: 500 })
  return Response.json({ results: data })
}
