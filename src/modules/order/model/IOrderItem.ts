import { IOrderProductAttribute } from '@modules/order/model/IOrderProductAttribute'

export interface IOrderItem {
  id: number
  product_id: number
  product_name: string
  product_sku: string
  product_base_price: number
  quantity: number
  attributes: IOrderProductAttribute[]
  provider_name: string | null
  collection_name: string | null
  category_name: string | null
  subcategory_name: string | null
  product_discount: number | null
  product_image: string | null
}
