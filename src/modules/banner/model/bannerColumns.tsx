import { IBanner } from '@modules/banner/model/IBanner'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import Avatar from '@mui/material/Avatar'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { getBannerTypeNameByKey } from '@modules/banner/lib/getBannerTypeNameByKey'
import { KeyedMutator } from 'swr'

interface Props {
  handleUpdateOpen(data: IBanner): void
  mutate: KeyedMutator<any>
  trigger(id: number): Promise<any>
}

export function bannerColumns({ handleUpdateOpen, trigger, mutate }: Props): GridColDef<IBanner>[] {
  return [
    { field: 'id', headerName: '#', width: 80 },
    // {
    //   field: 'image',
    //   headerName: 'Изображение',
    //   width: 100,
    //   renderCell: ({ row: { title, image } }) => (
    //     <Avatar
    //       src={image}
    //       alt={title}
    //     />
    //   )
    // },
    { field: 'title', headerName: 'Заголовок', flex: 1 },
    { field: 'description', headerName: 'Описание', flex: 1 },
    // {
    //   field: 'type',
    //   headerName: 'Тип',
    //   renderCell: ({ row: { type } }) => <>{getBannerTypeNameByKey(type)}</>,
    //   width: 150,
    // },
    { field: 'order', headerName: 'Порядок', width: 100 },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: ({ row }) => [
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
