import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { IProduct } from '@modules/product'
import Avatar from '@mui/material/Avatar'
import { KeyedMutator } from 'swr'

interface Props {
  trigger(id: number): Promise<any>
  mutate: KeyedMutator<any>
}

export function productColumns({trigger, mutate}: Props): GridColDef<IProduct>[] {
  return [
    {field: 'id', headerName: '#', width: 80},
    {
      field: 'image',
      headerName: 'Изображение',
      width: 60,
      renderCell: ({row: {name, image}}) => (
        <Avatar
          src={image}
          alt={name}
        />
      )
    },
    {field: 'name', headerName: 'Название', flex: 2},
    {
      field: 'category',
      headerName: 'Категория',
      flex: 1,
      renderCell: ({row: {category}}) => <>{category.name}</>
    },
    {
      field: 'subcategory',
      headerName: 'Подкатегория',
      flex: 1,
      renderCell: ({row: {subcategory}}) => <>{subcategory?.name}</>
    },
    {
      field: 'provider',
      headerName: 'Поставщик',
      flex: 1,
      renderCell: ({row: {provider}}) => <>{provider.name}</>
    },
    {
      field: 'collection',
      headerName: 'Коллекция',
      flex: 1,
      renderCell: ({row: {collection}}) => <>{collection?.name}</>
    },
    {field: 'sku', headerName: 'Код товара', flex: 1},
    {
      field: 'base_price',
      headerName: 'Базовая цена',
      flex: 1,
      renderCell: ({row: {base_price}}) => <>{base_price} смн.</>
    },
    {field: 'quantity', headerName: 'Кол-во', flex: 1},
    {
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: ({row}) => [
        <Link href={`/main/products/${row.slug}`}>
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
              toast.success(response.message)
              await mutate()
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
