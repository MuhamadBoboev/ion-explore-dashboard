import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import DeleteIcon from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'
import { KeyedMutator } from 'swr'
import { useRouter } from 'next/router'
import { IGalleryCategory } from '@modules/galleryCategory'

interface Props {
  mutate: KeyedMutator<any>

  handleUpdateOpen(data: IGalleryCategory): void

  trigger(id: number): Promise<any>
}

export function galleryCategoryColumns({handleUpdateOpen, trigger, mutate}: Props): GridColDef<IGalleryCategory>[] {
  const router = useRouter()
  return [
    {field: 'id', headerName: '#', width: 80},
    {field: 'name', headerName: 'Название', flex: 1},
    {
      field: 'actions',
      type: 'actions',
      width: 150,
      getActions: ({row}) => [
        <GridActionsCellItem
          title="Изображении"
          label="Изображении"
          icon={<PermMediaIcon sx={{fontSize: 24}}/>}
          onClick={() => {
            router.push(`/main/gallery/${row.id}`)
          }}
        />,
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
              await trigger(row.id)
              await mutate()
              toast.success('Успешно удалено')
            } catch (e) {
              toast.error('Произошла ошибка')
            }
          }}
        />
      ]
    }
  ]
}
