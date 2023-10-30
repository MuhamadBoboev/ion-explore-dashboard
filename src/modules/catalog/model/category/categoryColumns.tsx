import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import Avatar from '@mui/material/Avatar'
import WidgetsIcon from '@mui/icons-material/Widgets'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { ICategory } from '@modules/catalog'
import Link from 'next/link'
import { KeyedMutator } from 'swr'
import Button from '@mui/material/Button'

interface Props {
  handleUpdateOpen(data: ICategory): void
  mutate: KeyedMutator<any>
  trigger(id: number): Promise<any>
}

export function categoryColumns({handleUpdateOpen, trigger, mutate}: Props): GridColDef<ICategory>[] {
  return [
    {field: 'id', headerName: '#', width: 80},
    // {
    //   field: 'icon',
    //   headerName: 'Иконка',
    //   width: 100,
    //   renderCell: ({row: {name, icon}}) => (
    //     <Avatar
    //       src={icon}
    //       alt={name}
    //     />
    //   )
    // },
    {field: 'name', headerName: 'Название', flex: 1},
    {field: 'description', headerName: 'Описание', flex: 1},
    {field: 'order', headerName: 'Порядок', width: 100},
    {
      field: 'actions',
      type: 'actions',
      width: 350,
      getActions: ({row}) => [
        <Link style={{marginRight: 8}} href={`/main/categories/${row.slug}`}>
          <Button variant="outlined">Подкатегории</Button>
        </Link>,
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
