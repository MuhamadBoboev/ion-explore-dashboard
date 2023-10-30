import { IProvider } from '@modules/provider'
import { ICategory, ISubcategory } from '@modules/catalog'
import { ICollection } from '@modules/collection'
import { IProductType } from '@modules/productType'
import { IPagination } from '@shared/model/IPagination'
import { IProductImage } from '@modules/product/model/images/IProductImage'
import { IProductAttribute } from '@modules/product/model/attributes/IProductAttribute'
import { IService } from '@modules/service'

export interface IProduct {
  id: number
  name: string
  description: string | null
  image: string
  images: IProductImage[]
  sku: string
  provider: IProvider
  category: ICategory
  subcategory: ISubcategory | null
  collection?: ICollection
  slug: string
  base_price: number
  unit: string | null
  discount: number
  quantity: number
  product_type: IProductType
  attributes: IProductAttribute[]
  excluded_services: IService[]
}

export interface IProductsData extends IPagination {
  data: IProduct[]
}
