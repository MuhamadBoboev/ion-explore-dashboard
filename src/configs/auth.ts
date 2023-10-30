export default {
  meEndpoint: '/user/admin-profile',
  loginEndpoint: '/auth/admin-login',
  logoutEndpoint: '/user/logout',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
