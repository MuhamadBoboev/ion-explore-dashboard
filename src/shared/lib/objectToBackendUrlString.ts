export function objectToBackendUrlString(params: { [key: string]: number | string | number[] | string[] | undefined }) {
  return Object.keys(params).map(key => {
    const param = params[key]
    if (Array.isArray(param)) {
      return param.map(item => `${key}[]=${item}`).join('&')
    }
    return `${key}=${param}`
  }).join('&')
}