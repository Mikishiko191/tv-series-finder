import { memo } from 'react'

import RatingStars from '@mui/material/Rating'
import Box from '@mui/material/Box'
import StarIcon from '@mui/icons-material/Star'

interface RatingProps {
  value: number
}

const Rating = memo(
  (props: RatingProps) => {
    const { value } = props
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <RatingStars
          name="Movie rating"
          value={value}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          readOnly
          max={10}
        />
        {!!value && <Box sx={{ ml: 2 }}>{value}</Box>}
      </Box>
    )
  },
  (prevProps, nextProps) => {
    return prevProps.value === nextProps.value
  }
)

Rating.displayName = 'Rating'
export { Rating }
