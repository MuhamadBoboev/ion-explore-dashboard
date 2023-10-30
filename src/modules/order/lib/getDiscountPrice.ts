// Получить цену скидки
export function getDiscountPrice(price: number, discount?: number) {
  if (!discount) {
    return 0
  }
  return price / 100 * discount
}