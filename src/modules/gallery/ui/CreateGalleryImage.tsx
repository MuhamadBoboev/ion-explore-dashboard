import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import useSWRMutation from 'swr/mutation'
import { LoadingButton } from '@mui/lab'
import { KeyedMutator } from 'swr'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { useRouter } from 'next/router'
import { useGalleryStore } from '@modules/gallery/model/store'
import { createGalleryScheme, GalleryFormData } from '@modules/gallery/model/GalleryFormData'
import { GalleryForm } from '@modules/gallery/ui/GalleryForm'

interface Props {
  mutate: KeyedMutator<any>
}

function CreateGalleryImage({ mutate }: Props) {
  const [images, setImages] = useState<File[]>([])
  const { trigger, isMutating } = useSWRMutation('/gallery/', postFetcher)
  const [handleCreateClose] = useGalleryStore(({ handleCreateClose }) => [handleCreateClose])
  const router = useRouter()
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<GalleryFormData>({
    mode: 'onBlur',
    defaultValues: {
      // category_id: Number(router.query.id),
    },
    resolver: yupResolver(createGalleryScheme)
  })

  const onSubmit: SubmitHandler<GalleryFormData> = async (data) => {
    try {
      await trigger({
        ...data,
        // author: 'Iontravel',
        tour_id: Number(router.query.id),
        // location: 'Jss',
        image: images[0]
      })
      await mutate()
      toast.success('Успешно создано')
      handleCreateClose()
    } catch (e) {
      toast.error('Произошла ошибка')
    }
  }

  return (
    <CustomDialog
      title="Создать"
      handleClose={handleCreateClose}
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

export { CreateGalleryImage }
