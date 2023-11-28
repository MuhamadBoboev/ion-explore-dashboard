import useSWR, { KeyedMutator } from 'swr'
// import { IService } from '@modules/service'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import Loader from '@shared/ui/Loader'
import { langSelector, useLanguageStore } from '@shared/model/store'
import { useCategoryStore } from '../model/store'
import { CreateCategory } from './CreateCategory'
import { UpdateCategory } from './UpdateCategory'

interface Props {
  mutate: KeyedMutator<any>
}

function CategoryModals({ mutate }: Props) {
  const lang = useLanguageStore(langSelector)
  const [open, update] = useCategoryStore(({ open, update }) => [open, update])
  const { data } = useSWR<any>(`/tour/?lang=${lang}`, getFetcher)


  if (!data) {
    return <Loader />
  }

  // debugger
  return (
    <>
      {open && <CreateCategory mutate={mutate} services={data} />}
      {update && <UpdateCategory mutate={mutate} services={data} />}
    </>
  )
}

export { CategoryModals }
