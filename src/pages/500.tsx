// ** React Imports
import { ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations'
import getHomeRoute from '../layouts/components/acl/getHomeRoute'

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginBottom: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginBottom: theme.spacing(20)
  }
}))

const Error500 = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Img height='500' alt='error-illustration' src='/images/pages/500-error-illustration.svg' />
        <BoxWrapper>
          <Typography variant='h4' sx={{ mb: 1.5 }}>
            Произошла ошибка на стороне сервера
          </Typography>
          <Button href={getHomeRoute()} component={Link} variant='contained'>
            На главную страницу
          </Button>
        </BoxWrapper>
      </Box>
      <FooterIllustrations />
    </Box>
  )
}

Error500.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Error500
