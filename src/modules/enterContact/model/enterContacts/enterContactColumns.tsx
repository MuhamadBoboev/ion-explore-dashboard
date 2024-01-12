import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'
import { ICategory } from '@modules/catalog'
import Link from 'next/link'
import { KeyedMutator } from 'swr'
import Button from '@mui/material/Button'
import { useLanguageStore } from '@shared/model/store'
import { IEnterContact } from './IEnterContact'

interface Props {
  handleUpdateOpen(data: IEnterContact): void
  mutate: KeyedMutator<any>
  trigger(id: number): Promise<any>
}

export function enterContactColumns({ handleUpdateOpen, trigger, mutate }: Props): GridColDef<IEnterContact>[] {
  const { lang } = useLanguageStore(({ lang }) => ({ lang }))

  return [
    { field: 'id', headerName: '#', width: 80 },
    { field: 'address', headerName: 'Адресс', flex: 1 },
    { field: 'phone', headerName: 'Телефон', flex: 1 },
    { field: 'whatsapp', headerName: 'Whatsapp', flex: 1 },
    // { field: 'order', headerName: 'Порядок', width: 100 },
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
