export interface Ayah {
  id: number
  arabic: string
  english: string
  surah: number
  ayah: number
  juz: number
  themeTags: string[]
  rootWords: { word: string }[]
  similarity?: number
  tafsir?: string
}