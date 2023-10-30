import { getDiscountPrice } from '@modules/order/lib/getDiscountPrice'

// Получить цену со скидкой
export function getPriceWithDiscount(price: number, discount?: number) {
  if (!discount) {
    return price
  }
  return +(price - getDiscountPrice(price, discount)).toFixed(2)
}
