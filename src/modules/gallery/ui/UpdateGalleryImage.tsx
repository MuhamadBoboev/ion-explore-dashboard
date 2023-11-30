import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'
import { LoadingButton } from '@mui/lab'
import toast from 'react-hot-toast'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { useRouter } from 'next/router'
import { useGalleryStore } from '@modules/gallery/model/store'
import { GalleryFormData, updateGalleryScheme } from '@modules/gallery/model/GalleryFormData'
import { GalleryForm } from '@modules/gallery/ui/GalleryForm'

interface Props {
  mutate: KeyedMutator<any>
}

function UpdateGalleryImage({ mutate }: Props) {
  const [images, setImages] = useState<File[]>([])
  const router = useRouter()
  const [gallery, handleUpdateClose] = useGalleryStore(
    ({ handleUpdateClose, update }) => [update, handleUpdateClose]
  )
  const { trigger, isMutating } = useSWRMutation(['/gallery', gallery?.id], updateFetcher)
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<GalleryFormData>({
    mode: 'onBlur',
    defaultValues: {
      author: gallery?.author,
      location: gallery?.location,
      image: gallery?.img
    },
    resolver: yupResolver(updateGalleryScheme)
  })

  const onSubmit: SubmitHandler<GalleryFormData> = async (data) => {
    try {
      await trigger({ ...data, category_id: Number(router.query.id), img: images[0] })
      await mutate()
      handleUpdateClose()
      toast.success('Успешно изменено')
    } catch (e) {
      toast.error('Произошла ошибка')
    }
  }

  return (
    <CustomDialog
      title="Изменить"
      handleClose={handleUpdateClose}
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <GalleryForm
          errors={errors}
          control={control}
          images={images}
          setImages={setImages}
          setValue={setValue}
        />
        <LoadingButton
          loading={isMutating}
          fullWidth
          type="submit"
          size="large"
          variant="contained"
          sx={{ mt: 5 }}
        >
          Отправить
        </LoadingButton>
      </form>
    </CustomDialog>
  )
}

export { UpdateGalleryImage }
