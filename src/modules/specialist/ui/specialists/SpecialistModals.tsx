import useSWR, { KeyedMutator } from 'swr'
import { useSpecialistStore } from '@modules/specialist/model/specialists/store'
import { CreateSpecialist } from '@modules/specialist/ui/specialists/CreateSpecialist'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { UpdateSpecialist } from '@modules/specialist/ui/specialists/UpdateSpecialist'
import { ISpecialist } from '@modules/specialist/model/specialists/ISpecialist'

interface Props {
  mutate: KeyedMutator<any>
}

function SpecialistModals({ mutate }: Props) {
  const [open, update] = useSpecialistStore(({ open, update }) => [open, update])



  return (
    <>
      {open && <CreateSpecialist
        mutate={mutate}
      />}
      {update && <UpdateSpecialist
        mutate={mutate}
      />}
    </>
  )
}

export { SpecialistModals }
