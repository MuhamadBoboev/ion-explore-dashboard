import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { KeyedMutator } from 'swr'
import { IGalleryCategory } from '@modules/galleryCategory'
import { useGalleryCategoryStore } from '@modules/galleryCategory/model/store'
import { galleryCategoryColumns } from '@modules/galleryCategory/model/galleryCategoryColumns'

interface Props {
  loading: boolean
  galleryCategories: IGalleryCategory[]
  mutate: KeyedMutator<any>
}

function GalleryCategoriesTable({ galleryCategories, loading, mutate }: Props) {
  const { trigger } = useSWRMutation('/gallery', deleteFetcher)
  const [handleUpdateOpen] = useGalleryCategoryStore(({ handleUpdateOpen }) => [handleUpdateOpen])

  return (
    <DataGrid
      slots={{ loadingOverlay: LinearProgress }}
      hideFooter
      loading={loading}
      columns={galleryCategoryColumns({ handleUpdateOpen, trigger, mutate })}
      rows={galleryCategories}
      rowSelection={false}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { GalleryCategoriesTable }
