import useSWR from 'swr'
import Error500 from '../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { useAdminStore } from '@modules/admin/model/store'
import { IUser } from '@modules/user'
import { AdminModals } from '@modules/admin/ui/AdminModals'
import { AdminsTable } from '@modules/admin/ui/AdminsTable'

function Admins() {
  const [handleCreateOpen] = useAdminStore(({handleCreateOpen}) => [handleCreateOpen])
  const {
    data: admins,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<{ data: IUser[] }>('/admins', getFetcher)

  if (error) {
    return <Error500/>
  }

  return (
    <CustomCard>
      <AdminModals mutate={mutate}/>
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title="Админы"
        buttonName="Создать"
      />
      <AdminsTable
        loading={isLoading || isValidating}
        admins={admins?.data || []}
        mutate={mutate}
      />
    </CustomCard>
  )
}

export { Admins }
