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
import { useLanguageStore } from '@shared/model/store'
import { IStepsItem } from '@modules/provider/model/ITour'

interface Props {
  handleUpdateOpen(data: IStepsItem): void
  mutate: KeyedMutator<any>
  trigger(id: number): Promise<any>
}

export function categoryColumns({ handleUpdateOpen, trigger, mutate }: Props): GridColDef<IStepsItem>[] {
  const { lang } = useLanguageStore(({ lang }) => ({ lang }))

  return [
    { field: 'id', headerName: '#', width: 80 },

    { field: 'name', headerName: 'Название', flex: 1 },
    { field: 'description', headerName: 'Описание', flex: 1 },
    { field: 'order', headerName: 'Этап', flex: 1 },
    { field: 'step', headerName: 'Шаг', flex: 1 },
    {
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: ({ row }) => [
        // <Link style={{ marginRight: 8 }} href={`/main/categories/${row.id}?lang=${lang}`}>
        //   <Button variant="outlined">Подкатегории</Button>
        // </Link>,
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
              toast.success('Успешно удалено!')
            } catch (e) {
              toast.error('Произошла ошибка')
            }
          }}
        />
      ]
    }
  ]
}
