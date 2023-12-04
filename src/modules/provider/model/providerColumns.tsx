import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import Avatar from '@mui/material/Avatar'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { ITour } from '@modules/provider'
import { KeyedMutator } from 'swr'
import Collections from '@mui/icons-material/Collections'
import { Button } from '@mui/material'
import Link from 'next/link'

interface Props {
  mutate: KeyedMutator<any>
  handleUpdateOpen(data: ITour): void
  trigger(id: number): Promise<any>
}

export function providerColumns({ mutate, handleUpdateOpen, trigger }: Props): GridColDef<ITour>[] {
  return [
    { field: 'id', headerName: '#', width: 80 },
    {
      field: 'image',
      headerName: 'Лого',
      width: 100,
      renderCell: ({ row: { name, image } }) => (
        <Avatar
          src={image}
          alt={name}
        />
      )
    },
    { field: 'name', headerName: 'Название', flex: 1 },
    { field: 'description', headerName: 'Описание', flex: 1 },
    { field: 'region', headerName: 'Регион', flex: 1 },
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
      width: 300,
      getActions: ({ row }) => [
        <Link href={`/main/tour/${row.id}/gallery`} >
          <Button variant='outlined'>
            Галерея
          </Button>
        </Link>,
        <Link href={`/main/tour/${row.id}/steps`} >
          <Button variant='outlined'>
            Шаги
          </Button>
        </Link>,
        <GridActionsCellItem
          title="Изменить"
          label="Изменить"
          icon={<EditIcon sx={{ fontSize: 24 }} />}
          onClick={() => {
            handleUpdateOpen(row)
          }}
        />,
        // <GridActionsCellItem
        //   title="Галерея"
        //   label="Галерея"
        //   icon={<Collections sx={{ fontSize: 24 }} />}
        //   onClick={() => {
        //     handleUpdateOpen(row)
        //   }}
        // />,
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
