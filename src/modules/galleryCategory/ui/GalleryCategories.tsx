import useSWR from 'swr'
import Error500 from '../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
// import { langSelector, useLangStore } from '@shared/model/langStore'
import { IGalleryCategory } from '@modules/galleryCategory'
import { useGalleryCategoryStore } from '@modules/galleryCategory/model/store'
import { GalleryCategoryModals } from '@modules/galleryCategory/ui/GalleryCategoryModals'
import { GalleryCategoriesTable } from '@modules/galleryCategory/ui/GalleryCategoriesTable'
import { langSelector, useLanguageStore } from '@shared/model/store'

function GalleryCategories() {
  const [handleCreateOpen] = useGalleryCategoryStore(({ handleCreateOpen }) => [handleCreateOpen])
  const lang = useLanguageStore(langSelector)
  const {
    data: galleryCategories,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<IGalleryCategory[]>(`/gallery/?lang=${lang}`, (url) => getFetcher(url))

  if (error) {
    return <Error500 />
  }

  return (
    <CustomCard>
      <GalleryCategoryModals mutate={mutate} />
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title="Категории галереи"
        buttonName="Создать"
      />
      <GalleryCategoriesTable
        loading={isLoading || isValidating}
        galleryCategories={galleryCategories || []}
        mutate={mutate}
      />
    </CustomCard>
  )
}

export { GalleryCategories }
