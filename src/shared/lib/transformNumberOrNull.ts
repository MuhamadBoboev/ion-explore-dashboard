export function transformNumberOrNull(value: number) {
  return Number.isNaN(value) ? null : value
}
