import useSWR from 'swr'
import Error500 from '../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { useCollectionStore } from '@modules/collection/model/store'
import { ICollectionData } from '@modules/collection/model/ICollection'
import { CollectionsTable } from '@modules/collection/ui/CollectionsTable'
import { CollectionModals } from '@modules/collection/ui/CollectionModals'
import { useState } from 'react'

function Collections() {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })
  const [handleCreateOpen] = useCollectionStore(({handleCreateOpen}) => [handleCreateOpen])
  const {
    data: collections,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<ICollectionData>(`/collections?page=${paginationModel.page + 1}&per_page=${paginationModel.pageSize}`, getFetcher)

  if (error) {
    return <Error500/>
  }

  return (
    <CustomCard>
      <CollectionModals mutate={mutate}/>
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title="Коллекции"
        buttonName="Создать"
      />
      <CollectionsTable
        loading={isLoading || isValidating}
        collections={collections}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        mutate={mutate}
      />
    </CustomCard>
  )
}

export { Collections }
