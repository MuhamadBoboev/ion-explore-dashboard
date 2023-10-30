import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import Avatar from '@mui/material/Avatar'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { IPaymentMethod } from '@modules/paymentMethod/model/IPaymentMethod'

interface Props {
  handleUpdateOpen(data: IPaymentMethod): void

  trigger(id: number): Promise<any>
}

export function paymentMethodColumns({handleUpdateOpen, trigger}: Props): GridColDef<IPaymentMethod>[] {
  return [
    {field: 'id', headerName: '#', width: 80},
    {
      field: 'icon',
      headerName: 'Иконка',
      width: 100,
      renderCell: ({row: {name, icon}}) => (
        <Avatar
          src={icon}
          alt={name}
        />
      )
    },
    {field: 'key', headerName: 'Ключ', flex: 1},
    {field: 'name', headerName: 'Название', flex: 1},
    {field: 'description', headerName: 'Описание', flex: 1},
    {
      field: 'is_active',
      headerName: 'Статус',
      width: 100,
      renderCell: ({row: {is_active}}) => {
        const text = is_active ? 'Активынй' : 'Неактивный'
        return <>{text}</>
      }
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
