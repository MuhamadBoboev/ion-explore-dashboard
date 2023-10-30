import useSWR from 'swr'
import Error500 from '../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { useAttributeStore } from '@modules/attribute/model/store'
import { IAttribute } from '@modules/attribute/model/IAttribute'
import { AttributesTable } from '@modules/attribute/ui/AttributesTable'
import { AttributeModals } from '@modules/attribute/ui/AttributeModals'

function Attributes() {
  const [handleCreateOpen] = useAttributeStore(({handleCreateOpen}) => [handleCreateOpen])
  const {
    data: attributes,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<{ data: IAttribute[] }>('/attributes', getFetcher)

  if (error) {
    return <Error500/>
  }

  return (
    <CustomCard>
      <AttributeModals mutate={mutate}/>
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title="Атрибуты"
        buttonName="Создать"
      />
      <AttributesTable
        loading={isLoading || isValidating}
        attributes={attributes?.data || []}
        mutate={mutate}
      />
    </CustomCard>
  )
}

export { Attributes }
