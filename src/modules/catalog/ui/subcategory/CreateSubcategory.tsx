import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useSubcategoryStore } from '@modules/catalog/model/subcategory/store'
import { createSubcategoryScheme, SubcategoryFormData } from '@modules/catalog/model/subcategory/SubcategoryFormData'
import { SubcategoryForm } from '@modules/catalog/ui/subcategory/SubcategoryForm'
import { KeyedMutator } from 'swr'
// import { IService } from '@modules/service'
import { postFetcherJson } from '@shared/api/fetcher/postFetcherJson'
import { useRouter } from 'next/router'

interface Props {
  categoryId: number
  mutate: KeyedMutator<any>
  services: any
}

function CreateSubcategory({ categoryId, mutate, services }: Props) {
  const [icons, setIcons] = useState<File[]>([])
  const router = useRouter()

  const { trigger, isMutating } = useSWRMutation('/sub-category/', postFetcher)
  const [handleCreateClose] = useSubcategoryStore(({ handleCreateClose }) => [handleCreateClose])
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
  } = useForm<SubcategoryFormData>({
    mode: 'onBlur',
    defaultValues: {
      category_id: Number(router.query.slug)
    },
    resolver: yupResolver(createSubcategoryScheme)
  })

  const onSubmit: SubmitHandler<SubcategoryFormData> = async (data) => {
    // console.log(icons[0])
    // return
    if (icons.length === 0) {
      setError('icon', {
        message: 'Пожалуйста выберите иконку'
      })
      // console.log(icons[0])
    }
    try {
      const response = await trigger({ ...data, icon: icons[0] })
      // console.log(icons[0])
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
        <SubcategoryForm
          errors={errors}
          control={control}
          setIcons={setIcons}
          setValue={setValue}
          icons={icons}
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

export { CreateSubcategory }
