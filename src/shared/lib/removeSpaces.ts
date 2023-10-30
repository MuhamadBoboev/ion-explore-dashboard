export function removeSpaces(str: string) {
  try {
    return str.replace(/\s/g, '')
  } catch (e) {
    return ''
  }
}