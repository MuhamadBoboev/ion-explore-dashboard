import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { IUser } from '@modules/user'
import { KeyedMutator } from 'swr'

interface Props {
  handleUpdateOpen(data: IUser): void

  mutate: KeyedMutator<any>

  trigger(id: number): Promise<any>
}

export function adminColumns({handleUpdateOpen, trigger, mutate}: Props): GridColDef<IUser>[] {
  return [
    {field: 'id', headerName: '#', width: 80},
    {field: 'name', headerName: 'Имя', flex: 1},
    {field: 'email', headerName: 'Email', flex: 1},
    {
      field: 'roles',
      headerName: 'Роли',
      renderCell: ({row: {roles}}) => {
        const userRoles = roles
          .filter(({key}) => key !== 'user')
          .map(({name}) => name)
          .join(', ')
        return <>{userRoles}</>
      },
      flex: 2
    },
    {
      field: 'created_at',
      headerName: 'Дата создании',
      renderCell: ({row: {created_at}}) => <>{new Date(created_at).toLocaleDateString('ru')}</>,
      flex: 1
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: ({row}) => [
        <GridActionsCellItem
          title="Изменить"
          label="Изменить"
          icon={<EditIcon sx={{fontSize: 24}}/>}
          onClick={() => {
            handleUpdateOpen(row)
          }}
        />,
        <GridActionsCellItem
          label="Удалить"
          title="Удалить"
          icon={<DeleteIcon sx={{fontSize: 24}}/>}
          onClick={async () => {
            try {
              const response = await trigger(row.id)
              await mutate()
              toast.success(response.message)
            } catch (e) {
              const error = e as AxiosError<{ message: string }>
              toast.error(error.response?.data.message || 'Произошла ошибка')
            }
          }}
        />
      ]
    }
  ]
}
