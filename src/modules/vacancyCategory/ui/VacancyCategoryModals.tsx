import { KeyedMutator } from 'swr'
import { useVacancyCategoryStore } from '@modules/vacancyCategory/model/store'
import { CreateVacancyCategory } from '@modules/vacancyCategory/ui/CreateVacancyCategory'
import { UpdateVacancyCategory } from '@modules/vacancyCategory/ui/UpdateVacancyCategory'

interface Props {
  mutate: KeyedMutator<any>
}

function VacancyCategoryModals({mutate}: Props) {
  const [open, update] = useVacancyCategoryStore(({open, update}) => [open, update])

  return (
    <>
      {open && <CreateVacancyCategory/>}
      {update && <UpdateVacancyCategory mutate={mutate}/>}
    </>
  )
}

export { VacancyCategoryModals }
