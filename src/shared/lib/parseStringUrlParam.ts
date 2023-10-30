export function parseStringUrlParam(param: string | string[]) {
  if (!param) {
    return null
  }
  if (typeof param !== 'string') {
    return null
  }
  return param;
}