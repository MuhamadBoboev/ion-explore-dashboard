import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import Avatar from '@mui/material/Avatar'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { ISubcategory } from '@modules/catalog'
import { KeyedMutator } from 'swr'

interface Props {
  mutate: KeyedMutator<any>

  handleUpdateOpen(data: ISubcategory): void

  trigger(id: number): Promise<any>
}

export function subcategoryColumns({ handleUpdateOpen, trigger, mutate }: Props): GridColDef<ISubcategory>[] {
  // console.log()
  return [
    { field: 'id', headerName: '#', width: 80 },
    {
      field: 'icon',
      headerName: 'Иконка',
      width: 100,
      renderCell: ({ row: { name, icon } }) => (
        <Avatar
          src={icon}
          alt={name}
        />
      )
    },
    { field: 'name', headerName: 'Название', flex: 1 },
    { field: 'category_id', headerName: 'Категория', flex: 1 },
    // {field: 'order', headerName: 'Порядок', width: 100},
    {
      field: 'actions',
      type: 'actions',
      width: 90,
      getActions: ({ row }) => [
        <GridActionsCellItem
          title="Изменить"
          label="Изменить"
          icon={<EditIcon sx={{ fontSize: 24 }} />}
          onClick={() => {
            handleUpdateOpen(row)
          }}
        />,
        <GridActionsCellItem
          label="Удалить"
          title="Удалить"
          icon={<DeleteIcon sx={{ fontSize: 24 }} />}
          onClick={async () => {
            try {
              const response = await trigger(row.id)
              toast.success(response.message)
              await mutate()
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
