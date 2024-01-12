import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import Avatar from '@mui/material/Avatar'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { KeyedMutator } from 'swr'
import { IEntertainment } from './IEntertainment'
import Link from 'next/link'
import { Button } from '@mui/material'
import { useLanguageStore } from '@shared/model/store'

interface Props {
  mutate: KeyedMutator<any>
  handleUpdateOpen(data: IEntertainment): void
  trigger(id: number): Promise<any>
}

export function entertainmentColumns({ mutate, handleUpdateOpen, trigger }: Props): GridColDef<IEntertainment>[] {
  const { lang } = useLanguageStore(({ lang }) => ({ lang }))

  return [
    { field: 'id', headerName: '#', width: 80 },
    {
      field: 'image',
      headerName: 'Лого',
      width: 100,
      renderCell: ({ row: { title, image } }) => (
        <Avatar
          src={image}
          alt={title}
        />
      )
    },
    { field: 'title', headerName: 'Название', flex: 1 },
    { field: 'description', headerName: 'Описание', flex: 1 },
    {
      field: 'subcategory',
      headerName: 'Категория',
      renderCell: ({ row: { subcategory } }) => (
        subcategory.name
      ),
      flex: 1
    },
    // {
    //   field: 'file',
    //   headerName: 'Файл',
    //   renderCell: ({ row: { file } }) => file ? 'Файл прикреплен' : 'Отсутствует',
    //   flex: 1,
    // },
    {
      field: 'actions',
      type: 'actions',
      width: 240,
      getActions: ({ row }) => [
        <Link style={{ marginRight: 8 }} href={`/main/entertainment/${row.id}?lang=${lang}`}>
          <Button variant="outlined">Контакты</Button>
        </Link>,
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
