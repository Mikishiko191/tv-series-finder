import { memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Material components
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Typography from '@mui/material/Typography'

// Components
import { Rating } from '../Rating/Rating'

// Types
import { ShowTypes } from '../../types/show'

// Utils
import { placeholderBlur } from '../../utils/placeholderBlur'

interface MovieListProps {
  data?: {
    show: ShowTypes
  }[]
}

const MovieList = memo(
  (props: MovieListProps) => {
    const { data } = props

    if (!data?.length) return null

    return (
      <List>
        {data.map(({ show }) => (
          <Link href={`/movie/${show.id}`} key={show.id}>
            <a>
              <ListItem alignItems="flex-start">
                <ListItemAvatar style={{ paddingRight: 10 }}>
                  <div style={{ width: 100, height: 150, position: 'relative' }}>
                    {show.image ? (
                      <Image src={show.image.medium} alt={show.name} layout="fill" objectFit="cover" />
                    ) : (
                      <Image
                        alt="No image"
                        src="https://images.pexels.com/photos/6447217/pexels-photo-6447217.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        layout="fill"
                        objectFit="cover"
                        placeholder="blur"
                        blurDataURL={placeholderBlur(100, 150)}
                      />
                    )}
                  </div>
                </ListItemAvatar>
                <ListItemText
                  primary={show.name}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                        dangerouslySetInnerHTML={{ __html: show.summary }}
                      />
                      {show.rating.average ? <Rating value={show.rating.average} /> : 'Not rated yet'}
                    </>
                  }
                />
              </ListItem>
              {data.length > 1 && <Divider variant="inset" component="li" />}
            </a>
          </Link>
        ))}
      </List>
    )
  },
  (prevProps, nextProps) => {
    if (prevProps?.data && nextProps?.data) {
      return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data)
    } else {
      return false
    }
  }
)

MovieList.displayName = 'MovieList'
export { MovieList }
