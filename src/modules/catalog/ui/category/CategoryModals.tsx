import useSWR, { KeyedMutator } from 'swr'
import { useCategoryStore } from '@modules/catalog/model/category/store'
import { CreateCategory } from '@modules/catalog/ui/category/CreateCategory'
import { UpdateCategory } from '@modules/catalog/ui/category/UpdateCategory'
// import { IService } from '@modules/service'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import Loader from '@shared/ui/Loader'
import { langSelector, useLanguageStore } from '@shared/model/store'

interface Props {
  mutate: KeyedMutator<any>
}

function CategoryModals({ mutate }: Props) {
  const lang = useLanguageStore(langSelector)
  const [open, update] = useCategoryStore(({ open, update }) => [open, update])
  const { data } = useSWR<any>(`/category/?lang=${lang}`, getFetcher)

  if (!data) {
    return <Loader />
  }

  // console.log(data)
  // debugger
  return (
    <>
      {open && <CreateCategory mutate={mutate} services={data} />}
      {update && <UpdateCategory mutate={mutate} services={data} />}
    </>
  )
}

export { CategoryModals }
