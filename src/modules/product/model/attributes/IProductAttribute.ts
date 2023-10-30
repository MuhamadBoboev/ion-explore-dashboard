import { IAttribute } from '@modules/attribute'

export interface IProductAttribute {
  id: number
  product_id: number
  attribute: IAttribute
  value: string
  quantity: number
  price: number
  sku: string
}
