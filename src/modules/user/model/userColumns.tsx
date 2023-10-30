import { GridColDef } from '@mui/x-data-grid'
import { IUser } from '@modules/user/model/IUser'

export function userColumns(): GridColDef<IUser>[] {
  return [
    {field: 'id', headerName: '#', width: 80},
    {field: 'name', headerName: 'Имя', flex: 1},
    {field: 'email', headerName: 'Email', flex: 1},
    {field: 'phone', headerName: 'Телефон', flex: 1},
    {field: 'address', headerName: 'Адрес', flex: 1},
    {
      field: 'created_at',
      headerName: 'Дата регистрации',
      renderCell: ({row: {created_at}}) => <>{new Date(created_at).toLocaleString('ru')}</>,
      flex: 1
    },
  ]
}
