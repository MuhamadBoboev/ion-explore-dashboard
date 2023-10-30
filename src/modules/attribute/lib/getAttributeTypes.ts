import { IProductAttribute } from '@modules/product'
import { IAttribute } from '@modules/attribute'

export function getAttributeTypes(productAttributes: IProductAttribute[]): IAttribute[] {
  const attributes: IAttribute[] = []
  productAttributes.forEach(({attribute}) => {
    if (!!attributes.find(({id}) => attribute.id === id)) {
      return
    }
    attributes.push(attribute)
  })
  return attributes
}
