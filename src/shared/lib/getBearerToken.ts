export function getBearerToken() {
  return `Bearer ${typeof window !== 'undefined' && localStorage.getItem('accessToken')}`
}
