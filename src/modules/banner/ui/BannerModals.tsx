import { KeyedMutator } from 'swr'
import { useBannerStore } from '@modules/banner/model/store'
import { CreateBanner } from '@modules/banner/ui/CreateBanner'
import { UpdateBanner } from '@modules/banner/ui/UpdateBanner'

interface Props {
  mutate: KeyedMutator<any>
}

function BannerModals({mutate}: Props) {
  const [open, update] = useBannerStore(({open, update}) => [open, update])

  return (
    <>
      {open && <CreateBanner mutate={mutate}/>}
      {update && <UpdateBanner mutate={mutate}/>}
    </>
  )
}

export { BannerModals }
