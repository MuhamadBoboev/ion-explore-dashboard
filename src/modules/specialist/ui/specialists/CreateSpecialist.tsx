import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useSpecialistStore } from '@modules/specialist/model/specialists/store'
import { createSpecialistScheme, SpecialistFormData } from '@modules/specialist/model/specialists/SpecialistFormData'
import { SpecialistForm } from '@modules/specialist/ui/specialists/SpecialistForm'
import { KeyedMutator } from 'swr'
import { useLanguageStore } from '@shared/model/store'

interface Props {
  mutate: KeyedMutator<any>
}

function CreateSpecialist({ mutate }: Props) {
  const lang = useLanguageStore(({ langList, lang }) => langList.find(({ code }) => code === lang))

  const [images, setImages] = useState<File[]>([])
  const { trigger, isMutating } = useSWRMutation('/guide/', postFetcher)
  const [handleCreateClose] = useSpecialistStore(({ handleCreateClose }) => [handleCreateClose])
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<SpecialistFormData>({
    defaultValues: {
      lang_id: lang?.id,
    },
    mode: 'onBlur',
    resolver: yupResolver(createSpecialistScheme)
  })

  const onSubmit: SubmitHandler<SpecialistFormData> = async (data) => {
    try {
      const response = await trigger({ ...data, image: images[0] })
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
      title="Добавить"
      handleClose={handleCreateClose}
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <SpecialistForm
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

export { CreateSpecialist }
