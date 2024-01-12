import useSWR from 'swr'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import Error500 from '../../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { langSelector, useLanguageStore } from '@shared/model/store'
import { useEnterContactStore } from '@modules/enterContact/model/enterContacts/store'
import { EnterContactModals } from './EnterContactModals'
import { EnterContactsTable } from './EnterContactsTable'
import { IEntertainment } from '@modules/entertainment'
import { useRouter } from 'next/router'
import { IconButton } from '@mui/material'
import { Icon } from '@iconify/react'
import Link from 'next/link'

function EnterContacts() {
  const lang = useLanguageStore(langSelector)
  const [handleCreateOpen] = useEnterContactStore(({ handleCreateOpen }) => [handleCreateOpen])
  const router = useRouter()
  const {
    data,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<IEntertainment>(`/entertainment/${router.query.id}?lang=${lang}`, getFetcher)

  if (error) {
    return <Error500 />
  }

  return (
    <CustomCard>
      <EnterContactModals mutate={mutate} />
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title={<>
          <IconButton
            title="Назад"
            sx={{ mr: 4 }}
            href="/main/entertainment"
            component={Link}
          >
            <Icon icon="ep:back" />
          </IconButton>
          Контакты "{data?.title || ''}"
        </>}
        buttonName="Создать"
      />
      <EnterContactsTable
        loading={isLoading || isValidating}
        contacts={data?.contact || []}
        mutate={mutate}
      />
    </CustomCard>
  )
}

export { EnterContacts }
