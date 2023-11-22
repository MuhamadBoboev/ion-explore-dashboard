import useSWR, { KeyedMutator } from 'swr'
// import { useEntertainmentStore } from '@modules/Entertainment/model/store'
// import { CreateEntertainment } from '@modules/Entertainment/ui/tour/CreateEntertainment'
// import { UpdateEntertainment } from '@modules/Entertainment/ui/tour/UpdateEntertainment'
import { ICategory, ISubcategory } from '@modules/catalog'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { CreateEntertainment } from './CreateEntertainment'
import { UpdateEntertainment } from './UpdateEntertainment'
import { useEntertainmentStore } from '@modules/entertainment/model/store'

interface Props {
  mutate: KeyedMutator<any>
}

function EntertainmentModals({ mutate }: Props) {
  const [open, update] = useEntertainmentStore(({ open, update }) => [open, update])
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
      {open && <CreateEntertainment categories={categories} mutate={mutate} />}
      {update && <UpdateEntertainment categories={categories} mutate={mutate} />}
    </>
  )
}

export { EntertainmentModals }
