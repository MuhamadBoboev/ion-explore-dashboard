import useSWR, { KeyedMutator } from 'swr'
import { useSpecialistStore } from '@modules/specialist/model/specialists/store'
import { CreateSpecialist } from '@modules/specialist/ui/specialists/CreateSpecialist'
import { ISpecialistCategory } from 'src/modules/specialistCategory'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { UpdateSpecialist } from '@modules/specialist/ui/specialists/UpdateSpecialist'

interface Props {
  mutate: KeyedMutator<any>
}

function SpecialistModals({mutate}: Props) {
  const [open, update] = useSpecialistStore(({open, update}) => [open, update])
  const {data: specialistCategories} = useSWR<{ data: ISpecialistCategory[] }>('/specialist-categories', getFetcher)

  if (!specialistCategories) {
    return null
  }

  return (
    <>
      {open && <CreateSpecialist
        specialistCategories={specialistCategories.data}
        mutate={mutate}
      />}
      {update && <UpdateSpecialist
        mutate={mutate}
        specialistCategories={specialistCategories.data}
      />}
    </>
  )
}

export { SpecialistModals }
