import { useState, useCallback, ChangeEvent } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

// Material components
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { Typography } from '@mui/material'

// Components
import { MovieList } from '../components/MovieList/MovieList'

// Hooks
import { useDebounce } from '../hooks/useDebounce'
import { useMovieSearch } from '../hooks/useMovieSearch'

const Home: NextPage = () => {
  const [search, setSearch] = useState<string | null>(null)

  const debouncedSearchValue: string | null = useDebounce<string | null>(search, 500)
  const { data, error } = useMovieSearch(debouncedSearchValue)

  const onHandleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }, [])

  const onHandleReset = useCallback(() => {
    setSearch(null)
  }, [])

  return (
    <div>
      <Head>
        <title>TV series search app</title>
        <meta name="description" content="TV series search app" />
      </Head>
      <Box style={{ paddingTop: 30 }}>
        <Typography variant="h4" component="div" gutterBottom>
          Tv series finder
        </Typography>
        <Typography variant="body2" component="div" gutterBottom style={{ paddingBottom: 10 }}>
          Find your dream tv series online without download
        </Typography>
        <FormControl variant="outlined" fullWidth>
          <OutlinedInput
            id="outlined-adornment-weight"
            value={search || ''}
            onChange={onHandleSearch}
            aria-describedby="Search movie"
            placeholder="Search movie"
            aria-label="Search movie"
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                {!!search?.length && (
                  <IconButton aria-label="toggle password visibility" onClick={onHandleReset} edge="end">
                    X
                  </IconButton>
                )}
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      {error?.message && <Box>{error.message}</Box>}
      <MovieList data={data} />
    </div>
  )
}

export default Home
