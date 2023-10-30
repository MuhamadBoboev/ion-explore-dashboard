import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { ICollection } from '@modules/collection/model/ICollection'
import { KeyedMutator } from 'swr'

interface Props {
  handleUpdateOpen(data: ICollection): void
  mutate: KeyedMutator<any>
  trigger(id: number): Promise<any>
}

export function collectionColumns({handleUpdateOpen, trigger, mutate}: Props): GridColDef<ICollection>[] {
  return [
    {field: 'id', headerName: '#', width: 80},
    {field: 'name', headerName: 'Название', flex: 2},
    {
      field: 'provider',
      headerName: 'Поставщик',
      flex: 1,
      renderCell: ({row: {provider: {name}}}) => <>{name}</>,
      width: 100
    },
    {
      field: 'category',
      headerName: 'Категория',
      flex: 1,
      renderCell: ({row: {category: {name}}}) => <>{name}</>,
      width: 100
    },
    {
      field: 'subcategory',
      headerName: 'Подкатегория',
      flex: 1,
      renderCell: ({row: {subcategory}}) => <>{subcategory?.name}</>,
      width: 100
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
