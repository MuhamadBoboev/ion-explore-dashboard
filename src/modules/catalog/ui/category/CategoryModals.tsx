import useSWR, { KeyedMutator } from 'swr'
import { useCategoryStore } from '@modules/catalog/model/category/store'
import { CreateCategory } from '@modules/catalog/ui/category/CreateCategory'
import { UpdateCategory } from '@modules/catalog/ui/category/UpdateCategory'
import { IService } from '@modules/service'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import Loader from '@shared/ui/Loader'

interface Props {
  mutate: KeyedMutator<any>
}

function CategoryModals({mutate}: Props) {
  const [open, update] = useCategoryStore(({open, update}) => [open, update])
  const {data: services} = useSWR<{ data: IService[] }>('/services?per_page=1000000', getFetcher)

  if (!services) {
    return <Loader/>
  }

  return (
    <>
      {open && <CreateCategory mutate={mutate} services={services.data}/>}
      {update && <UpdateCategory mutate={mutate} services={services.data}/>}
    </>
  )
}

export { CategoryModals }
