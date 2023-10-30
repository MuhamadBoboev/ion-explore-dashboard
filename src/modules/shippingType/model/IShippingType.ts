export interface IShippingType {
  id: number
  icon: string
  name: string
  key: string
  description: string | null
  price: number | null
  is_active: boolean
}
