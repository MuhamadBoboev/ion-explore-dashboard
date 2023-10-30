import axios from 'axios'

export const axiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: 'http://45.8.98.180:9001',
  headers: {
    Authorization: `Bearer ${typeof window !== 'undefined' && window.localStorage.getItem('accessToken')}`
  }
})
