import { KeyedMutator } from 'swr'
import { useGalleryCategoryStore } from '@modules/galleryCategory/model/store'
import { CreateGalleryCategory } from '@modules/galleryCategory/ui/CreateGalleryCategory'
import { UpdateGalleryCategory } from '@modules/galleryCategory/ui/UpdateGalleryCategory'

interface Props {
  mutate: KeyedMutator<any>
}

function GalleryCategoryModals({mutate}: Props) {
  const [open, update] = useGalleryCategoryStore(({open, update}) => [open, update])

  return (
    <>
      {open && <CreateGalleryCategory mutate={mutate}/>}
      {update && <UpdateGalleryCategory mutate={mutate}/>}
    </>
  )
}

export { GalleryCategoryModals }
