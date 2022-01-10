import { useRouter } from 'next/router'

// Material components
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { memo } from 'react'

const NavigationMemo = () => {
  const router = useRouter()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {router.pathname === '/' && (
            <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
              TV show finder
            </Typography>
          )}
          {!!router.query?.id && (
            <>
              <IconButton
                size="large"
                onClick={() => router.back()}
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Back to search
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

const Navigation = memo(NavigationMemo)
export { Navigation }
