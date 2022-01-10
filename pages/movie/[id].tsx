import { useState, useCallback, SyntheticEvent, useMemo } from 'react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'

// Material components
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

// Components
import { MovieCard } from '../../components/Cards/MovieCard'
import { Rating } from '../../components/Rating/Rating'

// Types
import { ShowTypes } from '../../types/show'

// Utils
import { placeholderBlur } from '../../utils/placeholderBlur'

export interface ShowDescriptionProps {
  show: ShowTypes
  seasonCount: number
  seasonList: any[]
}

const ShowDescription = (props: ShowDescriptionProps) => {
  const { show, seasonCount, seasonList } = props
  const [selectedSeason, setSelectSeason] = useState(0)

  const handleChange = useCallback((_: SyntheticEvent, newValue: number) => {
    setSelectSeason(newValue)
  }, [])

  const filterSeasonByNumber = useMemo(() => {
    const season = seasonList?.filter((item: any) => item.season === selectedSeason + 1) || []
    return season
  }, [selectedSeason, seasonList])

  return (
    <>
      <Box style={{ display: 'flex', marginBottom: 30, marginTop: 120, gap: 20 }}>
        <Box>
          {show?.image && (
            <div style={{ width: 350, height: 500, position: 'relative' }}>
              <Image
                src={show.image.original}
                alt={show.name}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL={placeholderBlur(350, 500)}
              />
            </div>
          )}
        </Box>
        <Box>
          <Typography variant="h4" gutterBottom component="div">
            {show.name}
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
            Genre: {show.genres.join(', ')}
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
            {show.network?.country.name && <>Country: {show.network.country.name}</>}
          </Typography>
          <Typography variant="h6" gutterBottom component="div" style={{ paddingBottom: 10 }}>
            {show.language && <>language: {show.language}</>}
          </Typography>

          {show.rating.average ? <Rating value={show.rating.average} /> : 'Not rated yet'}

          <Typography variant="body1" gutterBottom dangerouslySetInnerHTML={{ __html: show.summary }} />
        </Box>
      </Box>

      <div style={{ position: 'relative' }}>
        <Box
          sx={{ width: '100%', marginBottom: 5 }}
          style={{ position: 'sticky', top: 64, background: 'white', zIndex: 999 }}
        >
          <Tabs value={selectedSeason} onChange={handleChange} centered>
            {Array.from(Array(seasonCount).keys()).map((item) => (
              <Tab label={`Seasons ${item + 1}`} key={item} />
            ))}
          </Tabs>
        </Box>

        <Grid
          container
          rowSpacing={{ xs: 1, sm: 2, md: 3 }}
          alignItems="stretch"
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {filterSeasonByNumber.map((season) => (
            <Grid item xs={3} key={season.id}>
              <MovieCard
                name={season.name}
                description={season.summary}
                image={season.image?.original}
                url={season.url}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  )
}

const showURL = process.env.NEXT_PUBLIC_SHOWS_URL

export const getServerSideProps: GetServerSideProps = async (context) => {
  const fetchShows = await fetch(`${showURL}/${context.query.id}`)
  const show = await fetchShows.json()

  // Get seasons episodes
  const fetchSeasons = await fetch(show._links?.previousepisode.href)
  const seasonCount = await fetchSeasons.json()

  // Get seasons list
  const fetchSeasonList = await fetch(`${showURL}/${context.query.id}/episodes`)
  const seasonList = await fetchSeasonList.json()

  return {
    props: {
      show,
      seasonCount: seasonCount.season,
      seasonList,
    },
  }
}

export default ShowDescription
