import useSWR, { KeyedMutator } from 'swr'
import { IGalleryCategory } from '@modules/galleryCategory'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
// import { langSelector, useLangStore } from '@shared/model/langStore'
import { useGalleryStore } from '@modules/gallery/model/store'
import { CreateGalleryImage } from '@modules/gallery/ui/CreateGalleryImage'
import { UpdateGalleryImage } from '@modules/gallery/ui/UpdateGalleryImage'
import { langSelector, useLanguageStore } from '@shared/model/store'

interface Props {
  mutate: KeyedMutator<any>
}

function GalleryModals({ mutate }: Props) {
  const [open, update] = useGalleryStore(({ open, update }) => [open, update])
  const lang = useLanguageStore(langSelector)

  return (
    <>
      {open && <CreateGalleryImage mutate={mutate} />}
      {update && <UpdateGalleryImage mutate={mutate} />}
    </>
  )
}

export { GalleryModals }
