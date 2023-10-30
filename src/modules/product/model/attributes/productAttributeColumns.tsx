import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { IProductAttribute } from '@modules/product/model/attributes/IProductAttribute'
import { KeyedMutator } from 'swr'

interface Props {
  mutate: KeyedMutator<any>
  handleUpdateOpen(data: IProductAttribute): void
  trigger(id: number): Promise<any>
}

export function productAttributeColumns({mutate, handleUpdateOpen, trigger}: Props): GridColDef<IProductAttribute>[] {
  return [
    {field: 'id', headerName: '#', width: 80},
    {
      field: 'attribute.name',
      headerName: 'Атрибут',
      renderCell: ({row: {attribute}}) => <>{attribute.name}</>,
      flex: 1,
    },
    {field: 'value', headerName: 'Значение', flex: 1},
    {field: 'attribute.unit',
      headerName: 'Ед. измер.',
      renderCell: ({row: {attribute}}) => <>{attribute.unit}</>,
      flex: 1
    },
    {field: 'price', headerName: 'Цена', flex: 1},
    {field: 'quantity', headerName: 'Количество', flex: 1},
    {field: 'sku', headerName: 'Артикул', flex: 1},
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
