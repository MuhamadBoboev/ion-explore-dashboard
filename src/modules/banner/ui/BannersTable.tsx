import { IBanner } from '@modules/banner'
import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { useBannerStore } from '@modules/banner/model/store'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { bannerColumns } from '@modules/banner/model/bannerColumns'
import { KeyedMutator } from 'swr'

interface Props {
  loading: boolean
  banners: IBanner[]
  mutate: KeyedMutator<any>
}

function BannersTable({banners, loading, mutate}: Props) {
  const {trigger} = useSWRMutation('/banners', deleteFetcher)
  const [handleUpdateOpen] = useBannerStore(({handleUpdateOpen}) => [handleUpdateOpen])

  return (
    <DataGrid
      slots={{loadingOverlay: LinearProgress}}
      hideFooter
      loading={loading}
      columns={bannerColumns({handleUpdateOpen, trigger, mutate})}
      rows={banners}
      rowSelection={false}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { BannersTable }
