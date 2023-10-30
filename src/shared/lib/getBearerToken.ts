export function getBearerToken() {
  console.log(localStorage.getItem('accessToken'))
  return `Bearer ${typeof window !== 'undefined' && localStorage.getItem('accessToken')}`
}
