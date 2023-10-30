export function arrayToSearchQuery(name: string, array: any[]) {
  return array.map(item => `${name}[]=${item}`).join('&')
}
