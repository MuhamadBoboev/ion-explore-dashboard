import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useProviderStore } from '@modules/provider/model/store'
import { createProviderScheme, ProviderFormData } from '@modules/provider/model/ProviderFormData'
import { ProviderForm } from '@modules/provider/ui/tour/ProviderForm'
import { ICategory, ISubcategory } from '@modules/catalog'
import { useLanguageStore } from '@shared/model/store'
import { KeyedMutator } from 'swr'

interface Props {
  mutate: KeyedMutator<any>
  categories: ISubcategory[]
}

function CreateProvider({ categories, mutate }: Props) {
  const [images, setImages] = useState<File[]>([])
  // const [files, setFiles] = useState<File[]>([])
  const { trigger, isMutating } = useSWRMutation('/tour/', postFetcher)
  const lang = useLanguageStore(({ langList, lang }) => langList.find((el) => el.code === lang))

  const [handleCreateClose] = useProviderStore(({ handleCreateClose }) => [handleCreateClose])
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
    getValues,
    watch,
  } = useForm<ProviderFormData>({
    mode: 'onBlur',
    defaultValues: {
      lang_id: lang?.id
    },
    resolver: yupResolver(createProviderScheme)
  })

  const onSubmit: SubmitHandler<ProviderFormData> = async (data) => {
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
        <ProviderForm
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

export { CreateProvider }
