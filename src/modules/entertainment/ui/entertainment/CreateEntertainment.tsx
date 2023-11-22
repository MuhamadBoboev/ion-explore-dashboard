import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
// import { useEntertainmentStore } from '@modules/Entertainment/model/store'
// import { createEntertainmentScheme, EntertainmentFormData } from '@modules/Entertainment/model/EntertainmentFormData'
// import { EntertainmentForm } from '@modules/Entertainment/ui/tour/EntertainmentForm'
import { ICategory, ISubcategory } from '@modules/catalog'
import { useLanguageStore } from '@shared/model/store'
import { KeyedMutator } from 'swr'
import { EntertainmentFormData, createEntertainmentScheme } from '@modules/entertainment/model/EntertainmentFormData'
import { EntertainmentForm } from './EntertainmentForm'
import { useEntertainmentStore } from '@modules/entertainment/model/store'

interface Props {
  mutate: KeyedMutator<any>
  categories: ISubcategory[]
}

function CreateEntertainment({ categories, mutate }: Props) {
  const [images, setImages] = useState<File[]>([])
  // const [files, setFiles] = useState<File[]>([])
  const { trigger, isMutating } = useSWRMutation('/entertainment/', postFetcher)
  const lang = useLanguageStore(({ langList, lang }) => langList.find((el) => el.code === lang))

  const [handleCreateClose] = useEntertainmentStore(({ handleCreateClose }) => [handleCreateClose])
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
    getValues,
    watch,
  } = useForm<EntertainmentFormData>({
    mode: 'onBlur',
    defaultValues: {
      lang_id: lang?.id
    },
    resolver: yupResolver(createEntertainmentScheme)
  })

  const onSubmit: SubmitHandler<EntertainmentFormData> = async (data) => {
    if (images.length === 0) {
      setError('image', {
        message: 'Выберите логотип поставщика'
      })
    }
    try {
      const response = await trigger({ ...data, image: images[0] })
      handleCreateClose()
      await mutate()
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
        <EntertainmentForm
          errors={errors}
          control={control}
          images={images}
          setImages={setImages}
          // files={files}
          // setFiles={setFiles}
          setValue={setValue}
          categories={categories}
          getValues={getValues}
          watch={watch}
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

export { CreateEntertainment }
