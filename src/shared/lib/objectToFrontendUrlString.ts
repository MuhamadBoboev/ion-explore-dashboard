export function objectToFrontendUrlString(params: {
  [key: string]: number | string | number[] | string[] | undefined
}) {
  return Object.keys(params).map(key => {
    const param = params[key]
    if (Array.isArray(param)) {
      return `${key}=${param.join()}`
    }
    return `${key}=${param}`
  }).join('&')
}