import useSWRMutation from 'swr/mutation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { KeyedMutator } from 'swr'
import { postFetcherJson } from '@shared/api/fetcher/postFetcherJson'
import { useGalleryCategoryStore } from '@modules/galleryCategory/model/store'
import {
  createGalleryCategoryScheme,
  GalleryCategoryFormData
} from '@modules/galleryCategory/model/GalleryCategoryFormData'
import { GalleryCategoryForm } from '@modules/galleryCategory/ui/GalleryCategoryForm'
import { langIdSelector, useLanguageStore } from '@shared/model/store'

interface Props {
  mutate: KeyedMutator<any>
}

function CreateGalleryCategory({ mutate }: Props) {
  const { trigger, isMutating } = useSWRMutation('/category_gallery/', postFetcherJson)
  const [handleCreateClose] = useGalleryCategoryStore(({ handleCreateClose }) => [handleCreateClose])
  // const langId = useLanguageStore(langIdSelector)
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<GalleryCategoryFormData>({
    mode: 'onBlur',
    defaultValues: {
      // lang_id: langId,
    },
    resolver: yupResolver(createGalleryCategoryScheme)
  })

  const onSubmit: SubmitHandler<GalleryCategoryFormData> = async (data) => {
    try {
      await trigger(data)
      await mutate()
      handleCreateClose()
      toast.success('Успешно создано')
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

export { CreateGalleryCategory }
