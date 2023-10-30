import useSWR, { KeyedMutator } from 'swr'
import { IProvider } from '@modules/provider'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { CreateCollection } from '@modules/collection/ui/CreateCollection'
import { UpdateCollection } from '@modules/collection/ui/UpdateCollection'
import { useCollectionStore } from '@modules/collection/model/store'

interface Props {
  mutate: KeyedMutator<any>
}

function CollectionModals({mutate}: Props) {
  const [open, update] = useCollectionStore(({open, update}) => [open, update])
  const {
    data: providers,
  } = useSWR<{ data: IProvider[] }>('/providers', getFetcher)

  if (!providers) {
    return null
  }

  return (
    <>
      {open && <CreateCollection providers={providers.data} mutate={mutate}/>}
      {update && <UpdateCollection providers={providers.data} mutate={mutate}/>}
    </>
  )
}

export { CollectionModals }
