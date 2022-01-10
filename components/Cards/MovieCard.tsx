import { memo } from 'react'
import Image from 'next/image'

// Material Components
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Utils
import { placeholderBlur } from '../../utils/placeholderBlur'

// Hooks
import { useTruncateText } from '../../hooks/useTruncateText'

interface MovieCardProps {
  name: string
  description: string
  image?: string
  url: string
}

const MovieCard = memo(
  (props: MovieCardProps) => {
    const classes = useTruncateText()
    const { name, description, image, url } = props

    const onHandleRedirectOnMovie = () => {
      window.open(url, '__blank')
    }

    return (
      <Card style={{ height: '100%', cursor: 'pointer' }} onClick={onHandleRedirectOnMovie} component="div">
        <div style={{ width: '100%', height: 200, position: 'relative' }}>
          {image ? (
            <Image
              alt={name}
              src={image}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={placeholderBlur(270, 200)}
            />
          ) : (
            <Image
              alt="No image"
              src="https://images.pexels.com/photos/6447217/pexels-photo-6447217.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={placeholderBlur(270, 200)}
            />
          )}
        </div>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          {description ? (
            <Typography
              variant="body2"
              className={classes.multiLineEllipsis}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            'No description'
          )}
        </CardContent>
        <CardActions>
          <Button color="success" onClick={onHandleRedirectOnMovie}>
            See episode
          </Button>
        </CardActions>
      </Card>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.description === nextProps.description &&
      prevProps.image === nextProps.image &&
      prevProps.name === nextProps.name &&
      prevProps.url === nextProps.url
    )
  }
)

MovieCard.displayName = 'MovieCard'
export { MovieCard }
