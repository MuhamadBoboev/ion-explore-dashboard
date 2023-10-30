import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${typeof window !== 'undefined' && window.localStorage.getItem('accessToken')}`
  }
})
