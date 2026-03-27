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

export interface SearchResult {
  id: number
  arabic_text: string
  translation_en: string
  surah_number: number
  ayah_number: number
  juz_number: number
  similarity_ar: number
  similarity_en: number
  theme_tags?: string[]
  root_words?: string[]
  tafsir_excerpt?: string
}