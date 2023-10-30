export interface IPaymentMethod {
  id: number
  icon: string
  name: string
  key: string
  description: string | null
  is_active: boolean
}
