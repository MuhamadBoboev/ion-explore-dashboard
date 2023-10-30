import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import Avatar from '@mui/material/Avatar'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { IProvider } from '@modules/provider'
import { KeyedMutator } from 'swr'

interface Props {
  mutate: KeyedMutator<any>

  handleUpdateOpen(data: IProvider): void

  trigger(id: number): Promise<any>
}

export function providerColumns({mutate, handleUpdateOpen, trigger}: Props): GridColDef<IProvider>[] {
  return [
    {field: 'id', headerName: '#', width: 80},
    {
      field: 'logo',
      headerName: 'Лого',
      width: 100,
      renderCell: ({row: {name, logo}}) => (
        <Avatar
          src={logo}
          alt={name}
        />
      )
    },
    {field: 'name', headerName: 'Название', flex: 1},
    {field: 'description', headerName: 'Описание', flex: 1},
    {
      field: 'file',
      headerName: 'Файл',
      renderCell: ({row: {file}}) => file ? 'Файл прикреплен' : 'Отсутствует',
      flex: 1,
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
