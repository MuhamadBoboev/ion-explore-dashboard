import { KeyedMutator } from 'swr'
import { useSpecialistCategoryStore } from '@modules/specialistCategory/model/store'
import { CreateSpecialistCategory } from '@modules/specialistCategory/ui/CreateSpecialistCategory'
import { UpdateSpecialistCategory } from '@modules/specialistCategory/ui/UpdateSpecialistCategory'

interface Props {
  mutate: KeyedMutator<any>
}

function SpecialistCategoryModals({mutate}: Props) {
  const [open, update] = useSpecialistCategoryStore(({open, update}) => [open, update])

  return (
    <>
      {open && <CreateSpecialistCategory/>}
      {update && <UpdateSpecialistCategory mutate={mutate}/>}
    </>
  )
}

export { SpecialistCategoryModals }
