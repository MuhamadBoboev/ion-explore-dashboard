import { KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useSubcategoryStore } from '@modules/catalog/model/subcategory/store'
import { SubcategoryFormData, updateSubcategoryScheme } from '@modules/catalog/model/subcategory/SubcategoryFormData'
import { SubcategoryForm } from '@modules/catalog/ui/subcategory/SubcategoryForm'
import { updateFetcherJson } from '@shared/api/fetcher/updateFetcherJson'
import { useState } from 'react'
import { useRouter } from 'next/router'

interface Props {
  categoryId: number
  mutate: KeyedMutator<any>
  services: any
}

function UpdateSubcategory({ categoryId, mutate, services }: Props) {
  const [icons, setIcons] = useState<File[]>([])
  const router = useRouter()
  const [subcategory, handleUpdateClose] = useSubcategoryStore(
    ({ handleUpdateClose, update }) => [update, handleUpdateClose]
  )
  const { trigger, isMutating } = useSWRMutation(['/sub-category', subcategory?.id], updateFetcher)
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    setValue
  } = useForm<SubcategoryFormData>({
    defaultValues: {
      name: subcategory?.name,
      category_id: Number(router.query.slug),
    },
    mode: 'onBlur',
    resolver: yupResolver(updateSubcategoryScheme)
  })

  console.log(errors)

  const onSubmit: SubmitHandler<SubcategoryFormData> = async (data) => {
    try {
      const response = await trigger({ ...data, icon: icons[0] })
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

export { UpdateSubcategory }
