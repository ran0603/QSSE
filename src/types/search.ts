export interface SearchRequestBody {
  query: {
    source_sentence: string
    sentences: string[]
  }
  filters: {
    surah?: number
    juz?: number
    theme?: string
    root?: string
  }
}