import { KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
// import { useLangStore } from '@shared/model/langStore'
import { updateFetcherJson } from '@shared/api/fetcher/updateFetcherJson'
import { useGalleryCategoryStore } from '@modules/galleryCategory/model/store'
import {
  GalleryCategoryFormData,
  updateGalleryCategoryScheme
} from '@modules/galleryCategory/model/GalleryCategoryFormData'
import { GalleryCategoryForm } from '@modules/galleryCategory/ui/GalleryCategoryForm'

interface Props {
  mutate: KeyedMutator<any>
}

function UpdateGalleryCategory({ mutate }: Props) {
  const [galleryCategory, handleUpdateClose] = useGalleryCategoryStore(
    ({ handleUpdateClose, update }) => [update, handleUpdateClose]
  )
  // const { langList } = useLangStore(({ langList }) => ({ langList }))
  const { trigger, isMutating } = useSWRMutation(['/category_gallery', galleryCategory?.id], updateFetcherJson)
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<GalleryCategoryFormData>({
    defaultValues: {
      name: galleryCategory?.name,
      // lang_id: langList?.find(({ code }) => code === galleryCategory?.lang_id)?.id
    },
    mode: 'onBlur',
    resolver: yupResolver(updateGalleryCategoryScheme)
  })

  const onSubmit: SubmitHandler<GalleryCategoryFormData> = async (data) => {
    try {
      await trigger(data)
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
        <GalleryCategoryForm
          errors={errors}
          control={control}
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

export { UpdateGalleryCategory }
