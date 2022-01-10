import { makeStyles } from '@mui/styles'

const LINES_TO_SHOW = 3

const useTruncateText = makeStyles({
  multiLineEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': LINES_TO_SHOW,
    '-webkit-box-orient': 'vertical',
  },
})

export { useTruncateText }
