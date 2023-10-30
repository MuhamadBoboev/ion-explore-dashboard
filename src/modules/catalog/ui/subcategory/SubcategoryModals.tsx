import useSWR, { KeyedMutator } from 'swr'
import { useSubcategoryStore } from '@modules/catalog/model/subcategory/store'
import { CreateSubcategory } from '@modules/catalog/ui/subcategory/CreateSubcategory'
import { UpdateSubcategory } from '@modules/catalog/ui/subcategory/UpdateSubcategory'
import { IService } from '@modules/service'
import Loader from '@shared/ui/Loader'
import { getFetcher } from '@shared/api/fetcher/getFetcher'

interface Props {
  mutate: KeyedMutator<any>
  categoryId: number
}

function SubcategoryModals({mutate, categoryId}: Props) {
  const [open, update] = useSubcategoryStore(({open, update}) => [open, update])
  const {data: services} = useSWR<{ data: IService[] }>('/services?per_page=1000000', getFetcher)

  if (!services) {
    return <Loader/>
  }

  return (
    <>
      {open && <CreateSubcategory
        mutate={mutate}
        categoryId={categoryId}
        services={services.data}
      />}
      {update && <UpdateSubcategory
        mutate={mutate}
        categoryId={categoryId}
        services={services.data}
      />}
    </>
  )
}

export { SubcategoryModals }
