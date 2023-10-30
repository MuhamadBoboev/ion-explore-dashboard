import useSWR, { KeyedMutator } from 'swr'
import { useProviderStore } from '@modules/provider/model/store'
import { CreateProvider } from '@modules/provider/ui/CreateProvider'
import { UpdateProvider } from '@modules/provider/ui/UpdateProvider'
import { ICategory } from '@modules/catalog'
import { getFetcher } from '@shared/api/fetcher/getFetcher'

interface Props {
  mutate: KeyedMutator<any>
}

function ProviderModals({mutate}: Props) {
  const [open, update] = useProviderStore(({open, update}) => [open, update])
  const {
    data: categories,
  } = useSWR<{ data: ICategory[] }>('/categories', getFetcher)

  if (!categories) {
    return null
  }

  return (
    <>
      {open && <CreateProvider categories={categories.data}/>}
      {update && <UpdateProvider categories={categories.data} mutate={mutate}/>}
    </>
  )
}

export { ProviderModals }
