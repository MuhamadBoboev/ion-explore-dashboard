import { IProduct } from '@modules/product'
import { UpdateProductFormData } from '@modules/product/model/updateProduct/UpdateProductFormData'

export function setProductDefaultValues(product: IProduct): UpdateProductFormData {
  return {
    name: product.name,
    sku: product.sku,
    base_price: product.base_price,
    discount: product.discount,
    quantity: product.quantity,
    product_type_id: product.product_type?.id,
    provider_id: product.provider.id,
    category_id: [product.category.id],
    subcategory_id: product.subcategory?.id ? [product.subcategory?.id] : [],
    collection_id: product.collection?.id ? [product.collection?.id] : [],
    service_ids: product.excluded_services.map(({id}) => id),
    unit: product.unit,
  }
}
