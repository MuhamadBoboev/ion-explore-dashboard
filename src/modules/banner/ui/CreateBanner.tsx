import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { useBannerStore } from '@modules/banner/model/store'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BannerFormData, createBannerScheme } from '@modules/banner/model/BannerFormData'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { BannerForm } from '@modules/banner/ui/BannerForm'
import { LoadingButton } from '@mui/lab'
import { KeyedMutator } from 'swr'

interface Props {
  mutate: KeyedMutator<any>
}

function CreateBanner({mutate}: Props) {
  const [images, setImages] = useState<File[]>([])
  const {trigger, isMutating} = useSWRMutation('/banners', postFetcher)
  const [handleCreateClose] = useBannerStore(({handleCreateClose}) => [handleCreateClose])
  const {
    control,
    formState: {errors},
    handleSubmit,
    setError,
    setValue,
  } = useForm<BannerFormData>({
    mode: 'onBlur',
    resolver: yupResolver(createBannerScheme)
  })

  const onSubmit: SubmitHandler<BannerFormData> = async (data) => {
    if (images.length === 0) {
      setError('image', {
        message: 'Пожалуйста выберите изображение'
      })
    }
    try {
      const response = await trigger({...data, image: images[0]})
      await mutate()
      handleCreateClose()
      toast.success(response.message)
    } catch (e) {
      const error = e as AxiosError<{ message: string }>
      toast.error(error.response?.data.message || 'Произошла ошибка')
    }
  }

  return (
    <CustomDialog
      title="Создать"
      handleClose={handleCreateClose}
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
          sx={{mt: 5}}
        >
          Отправить
        </LoadingButton>
      </form>
    </CustomDialog>
  )
}

export { CreateBanner }
