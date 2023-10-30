import useSWR, { KeyedMutator } from 'swr'
import { useAdminStore } from '@modules/admin/model/store'
import { CreateAdmin } from '@modules/admin/ui/CreateAdmin'
import { UpdateAdmin } from '@modules/admin/ui/UpdateAdmin'
import { IRole } from '@shared/model/IRole'
import { getFetcher } from '@shared/api/fetcher/getFetcher'

interface Props {
  mutate: KeyedMutator<any>
}

function AdminModals({mutate}: Props) {
  const [open, update] = useAdminStore(({open, update}) => [open, update])
  const {data: roles} = useSWR<IRole[]>('/roles', getFetcher)

  if (!roles) {
    return null
  }

  return (
    <>
      {open && <CreateAdmin roles={roles} mutate={mutate}/>}
      {update && <UpdateAdmin roles={roles} mutate={mutate}/>}
    </>
  )
}

export { AdminModals }
