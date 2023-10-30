import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { IOrder } from '@modules/order/model/IOrder'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface Props {
  handleChangeOpen(order: IOrder): void
}

export function orderColumns({handleChangeOpen}: Props): GridColDef<IOrder>[] {
  return [
    {field: 'id', headerName: '#', width: 80},
    {
      field: 'user',
      headerName: 'Имя',
      renderCell: ({row: {user}}) => <>{user.name}</>,
      flex: 2
    },
    {
      field: 'payment_method',
      headerName: 'Метод оплаты',
      renderCell: ({row: {payment_method}}) => <>{payment_method?.name}</>,
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Статус',
      renderCell: ({row: {status}}) => <>{status?.name}</>,
      flex: 1
    },
    {
      field: 'sub_total',
      headerName: 'Общая цена',
      renderCell: ({row: {sub_total}}) => <>{sub_total} c.</>,
      flex: 1
    },
    {
      field: 'date',
      headerName: 'Дата',
      renderCell: ({row: {created_at}}) => <span title={new Date(created_at).toLocaleString('ru')}>
        {new Date(created_at).toLocaleString('ru')}
      </span>,
      flex: 1
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: ({row}) => [
        <GridActionsCellItem
          title="Посмотреть"
          label="Посмотреть"
          icon={<RemoveRedEyeIcon sx={{fontSize: 24}}/>}
          onClick={() => handleChangeOpen(row)}
        />
      ]
    }
  ]
}
