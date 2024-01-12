import useSWR, { KeyedMutator } from 'swr'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import Loader from '@shared/ui/Loader'
import { langSelector, useLanguageStore } from '@shared/model/store'
import { CreateEnterContact } from './CreateEnterContact'
import { UpdateEnterContact } from './UpdateEnterContact'
import { useEnterContactStore } from '@modules/enterContact/model/enterContacts/store'

interface Props {
  mutate: KeyedMutator<any>
}

function EnterContactModals({ mutate }: Props) {
  const lang = useLanguageStore(langSelector)
  const [open, update] = useEnterContactStore(({ open, update }) => [open, update])
  // const { data } = useSWR<any>(`/entertainment/contacts`, getFetcher)

  // if (!data) {
  //   return <Loader />
  // }

  return (
    <>
      {open && <CreateEnterContact mutate={mutate} />}
      {update && <UpdateEnterContact mutate={mutate} />}
    </>
  )
}

export { EnterContactModals }
