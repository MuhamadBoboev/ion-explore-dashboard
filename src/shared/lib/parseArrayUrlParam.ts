import { removeSpaces } from '@shared/lib/removeSpaces'

export function parseArrayUrlParam(param?: string | string[]): number[] | null {
  if (!param) {
    return null
  }
  if (typeof param !== 'string') {
    return null
  }
  return removeSpaces(param)
    .split(',')
    .filter(Boolean)
    .map(Number)
    .filter(id => !isNaN(id))
}