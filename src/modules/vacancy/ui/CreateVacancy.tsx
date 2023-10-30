import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { SubmitHandler, useForm } from 'react-hook-form'
import { createVacancyScheme, VacancyFormData } from '@modules/vacancy/model/VacancyFormData'
import { yupResolver } from '@hookform/resolvers/yup'
import { VacancyForm } from '@modules/vacancy/ui/VacancyForm'
import useSWR from 'swr'
import { IVacancyCategory } from '@modules/vacancyCategory'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import Error500 from '../../../pages/500'
import Loader from '@shared/ui/Loader'
import { LoadingButton } from '@mui/lab'
import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import Grid from '@mui/material/Grid'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'

function CreateVacancy() {
  const router = useRouter()
  const {trigger, isMutating} = useSWRMutation('/vacancies', postFetcher)
  const {data: vacancyCategories, error} = useSWR<{ data: IVacancyCategory[] }>('/vacancy-categories', getFetcher)
  const {
    formState: {errors},
    handleSubmit,
    setValue,
    control,
    reset,
  } = useForm<VacancyFormData>({
    mode: 'onBlur',
    resolver: yupResolver(createVacancyScheme)
  })

  const onSubmit: SubmitHandler<VacancyFormData> = async (data) => {
    try {
      const response = await trigger(data)
      toast.success(response.message)
      reset({
        name: '',
        vacancy_category_id: undefined,
        short_description: '',
        description: '',
      })
      await router.push(`/main/vacancies/${response.data.slug}`)
    } catch (e) {
      const error = e as AxiosError<{ message: string }>
      toast.error(error.response?.data.message || 'Произошла ошибка')
    }
  }

  if (error) {
    return <Error500/>
  }

  if (!vacancyCategories) {
    return <Loader/>
  }

  return (
    <CustomCard>
      <CustomPageHeader
        title="Добавить вакансию"
        withButton={false}
      />
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <VacancyForm
          description={null}
          vacancyCategories={vacancyCategories.data}
          control={control}
          errors={errors}
          setValue={setValue}
        />
        <Grid
          container
          spacing={5}
          p={8}
          boxSizing="border-box"
        >
          <Grid item xs={12}>
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isMutating}
            >
              Отправить
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </CustomCard>
  )
}

export { CreateVacancy }
