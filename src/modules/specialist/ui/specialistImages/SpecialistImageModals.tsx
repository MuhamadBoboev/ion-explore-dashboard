import { KeyedMutator } from 'swr'
import { useSpecialistImageStore } from '@modules/specialist/model/specialistsImage/store'
import { CreateSpecialistImage } from '@modules/specialist/ui/specialistImages/CreateSpecialistImage'
import { UpdateSpecialistImage } from '@modules/specialist/ui/specialistImages/UpdateSpecialistImage'

interface Props {
  mutate: KeyedMutator<any>
  specialistId: number
}

function SpecialistImageModals({mutate, specialistId}: Props) {
  const [open, update] = useSpecialistImageStore(({open, update}) => [open, update])
  return (
    <>
      {open && <CreateSpecialistImage
        specialistId={specialistId}
        mutate={mutate}
      />}
      {update && <UpdateSpecialistImage mutate={mutate}/>}
    </>
  )
}

export { SpecialistImageModals }
