import useSWR, { KeyedMutator } from 'swr'
import { useProviderStore } from '@modules/provider/model/store'
import { CreateProvider } from '@modules/provider/ui/CreateProvider'
import { UpdateProvider } from '@modules/provider/ui/UpdateProvider'
import { ICategory, ISubcategory } from '@modules/catalog'
import { getFetcher } from '@shared/api/fetcher/getFetcher'

interface Props {
  mutate: KeyedMutator<any>
}

function ProviderModals({ mutate }: Props) {
  const [open, update] = useProviderStore(({ open, update }) => [open, update])
  const {
    data: categories,
  } = useSWR<ISubcategory[]>('/sub-category/', getFetcher)

  if (!categories) {
    return null
  }
  // console.log('data: ' + categories)
  // debugger
  return (
    <>
      {open && <CreateProvider categories={categories} />}
      {update && <UpdateProvider categories={categories} mutate={mutate} />}
    </>
  )
}

export { ProviderModals }
