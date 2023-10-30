import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { IAttribute } from '@modules/attribute/model/IAttribute'
import { KeyedMutator } from 'swr'

interface Props {
  handleUpdateOpen(data: IAttribute): void
  mutate: KeyedMutator<any>
  trigger(id: number): Promise<any>
}

export function attributeColumns({handleUpdateOpen, trigger, mutate}: Props): GridColDef<IAttribute>[] {
  return [
    {field: 'id', headerName: '#', width: 80},
    {field: 'name', headerName: 'Название', flex: 1},
    {field: 'unit', headerName: 'Единица измерения', flex: 1},
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
