import { KeyedMutator } from 'swr'
import { useState } from 'react'
import { useBannerStore } from '@modules/banner/model/store'
import useSWRMutation from 'swr/mutation'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BannerFormData, updateBannerScheme } from '@modules/banner/model/BannerFormData'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { BannerForm } from '@modules/banner/ui/BannerForm'
import { LoadingButton } from '@mui/lab'

interface Props {
  mutate: KeyedMutator<any>
}

function UpdateBanner({ mutate }: Props) {
  const [images, setImages] = useState<File[]>([])

  const [banner, handleUpdateClose] = useBannerStore(
    ({ handleUpdateClose, update }) => [update, handleUpdateClose]
  )

  const { trigger, isMutating } = useSWRMutation(['/banners', banner?.id], updateFetcher)

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<BannerFormData>({
    defaultValues: {
      title: banner?.title,
      description: banner?.description,
      link: banner?.link,
      button_text: banner?.button_text,
      type: banner?.type,
      order: banner?.order,
    },
    mode: 'onBlur',
    resolver: yupResolver(updateBannerScheme)
  })

  const onSubmit: SubmitHandler<BannerFormData> = async (data) => {
    try {
      const response = await trigger({ ...data, image: images[0] })
      await mutate()
      handleUpdateClose()
      toast.success(response.message)
    } catch (e) {
      const error = e as AxiosError<{ message: string }>
      toast.error(error.response?.data.message || 'Произошла ошибка')
    }
  }

  return (
    <CustomDialog
      title="Изменить"
      handleClose={handleUpdateClose}
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <BannerForm
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

export { UpdateBanner }
