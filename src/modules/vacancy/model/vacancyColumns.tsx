import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { IVacancy } from '@modules/vacancy'
import { KeyedMutator } from 'swr'

interface Props {
  trigger(id: number): Promise<any>
  mutate: KeyedMutator<any>
}

export function vacancyColumns({trigger, mutate}: Props): GridColDef<IVacancy>[] {
  return [
    {field: 'id', headerName: '#', width: 80},
    {field: 'name', headerName: 'Название', flex: 1},
    {
      field: 'category',
      headerName: 'Категория',
      flex: 1,
      renderCell: ({row: {category}}) => <>{category?.name}</>
    },
    {field: 'short_description', headerName: 'Крат. описание', flex: 1},
    {
      field: 'actions',
      type: 'actions',
      width: 150,
      getActions: ({row}) => [
        <Link href={`/main/vacancies/${row.slug}`}>
          <GridActionsCellItem
            title="Изменить"
            label="Изменить"
            icon={<EditIcon sx={{fontSize: 24}}/>}
          />
        </Link>,
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
