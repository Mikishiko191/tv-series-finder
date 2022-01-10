export interface ShowTypes {
  id: string
  name: string
  summary: string
  genres: string[]
  language: string
  url: string
  image: {
    medium: string
    original: string
  } | null
  rating: {
    average: number
  }
  network: {
    country: {
      name: string
    }
  }
  _links: {
    previousepisode: {
      href: string
    }
  }
}
