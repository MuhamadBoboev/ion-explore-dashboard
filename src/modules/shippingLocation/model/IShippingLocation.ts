export interface IShippingLocation {
  id: number
  name: string
  price: number
  is_active: boolean
  order: number | null
}
