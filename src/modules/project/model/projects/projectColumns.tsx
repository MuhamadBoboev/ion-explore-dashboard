import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import Avatar from '@mui/material/Avatar'
import CollectionsIcon from '@mui/icons-material/Collections'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { IProject } from '@modules/project/model/projects/IProject'
import { KeyedMutator } from 'swr'

interface Props {
  handleUpdateOpen(data: IProject): void
  mutate: KeyedMutator<any>
  trigger(id: number): Promise<any>
}

export function projectColumns({handleUpdateOpen, trigger, mutate}: Props): GridColDef<IProject>[] {
  return [
    {field: 'id', headerName: '#', width: 80},
    {
      field: 'image',
      headerName: 'Изображения',
      width: 100,
      renderCell: ({row: {title, image}}) => (
        <Avatar
          src={image || title}
          alt={title}
        />
      )
    },
    {field: 'title', headerName: 'Заголовок', flex: 1},
    {field: 'description', headerName: 'Описание', flex: 2},
    {field: 'short_description', headerName: 'Крат. описание', flex: 2},
    {
      field: 'actions',
      type: 'actions',
      width: 150,
      getActions: ({row}) => [
        <Link href={`/main/projects/${row.slug}`}>
          <GridActionsCellItem
            title="Изображении"
            label="Изображении"
            icon={<CollectionsIcon sx={{fontSize: 24}}/>}
          />
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
