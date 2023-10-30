import { IUser } from '@modules/user'
import { IPaymentMethod } from '@modules/paymentMethod'
import { IShippingType } from '@modules/shippingType'
import { IShippingLocation } from '@modules/shippingLocation/model/IShippingLocation'
import { IOrderStatus } from '@modules/order/model/IOrderStatus'
import { IOrderItem } from '@modules/order/model/IOrderItem'
import { IPagination } from '@shared/model/IPagination'

export interface IOrder {
  id: number
  user: IUser
  payment_method: IPaymentMethod | null,
  comment: string | null
  shipping_address: string | null
  shipping_type: IShippingType | null
  shipping_location: IShippingLocation | null
  discount: number
  status: IOrderStatus
  total: number
  sub_total: number
  items: IOrderItem[]
  created_at: string
  updated_at: string
}

export interface IOrderData extends IPagination {
  data: IOrder[]
}
