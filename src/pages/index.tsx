import { useEffect } from 'react'
import getHomeRoute from '../layouts/components/acl/getHomeRoute'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()
  useEffect(() => {
    router.push(getHomeRoute())
  }, [])
  return null
}

export default Home
