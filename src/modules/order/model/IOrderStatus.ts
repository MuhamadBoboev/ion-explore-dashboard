export interface IOrderStatus {
  id: string
  color: string
  name: string
  category_id: string
  show_client?: string
}

export interface IOrderStatusCategory {
  id: string
  name: string
  statuses: IOrderStatus[]
}
