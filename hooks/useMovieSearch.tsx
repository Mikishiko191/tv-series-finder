import useSWR from 'swr'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  return await res.json()
}

const searchURL = process.env.NEXT_PUBLIC_SEARCH_URL

const useMovieSearch = (search: string | null) => {
  const path = search ? `${searchURL}?q=${search}` : null
  const { data, error } = useSWR(path, fetcher)

  return { data, error }
}

export { fetcher, useMovieSearch }
