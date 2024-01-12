import { ISubcategory } from '@modules/catalog'
// import { IService } from '@modules/service'

export interface IEnterContact {
  id: number,
  address?: string | null
  latitude?: string | null
  longitude?: string | null
  phone?: string | null
  whatsapp?: string | null
  entertainment_id: number
}
