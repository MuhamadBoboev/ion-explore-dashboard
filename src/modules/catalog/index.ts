import { Categories } from '@modules/catalog/ui/category/Categories'
import { Subcategories } from '@modules/catalog/ui/subcategory/Subcategories'
import { ICategory } from '@modules/catalog/model/category/ICategory'
import { ISubcategory } from '@modules/catalog/model/subcategory/ISubcategory'
import { getCategories } from '@modules/catalog/api/getCategories'

export { Categories, Subcategories }
export { getCategories }
export type { ICategory, ISubcategory }
