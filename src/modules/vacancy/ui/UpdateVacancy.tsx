import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { IVacancyCategory } from '@modules/vacancyCategory'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { updateVacancyScheme, VacancyFormData } from '@modules/vacancy/model/VacancyFormData'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import Error500 from '../../../pages/500'
import Loader from '@shared/ui/Loader'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { VacancyForm } from '@modules/vacancy/ui/VacancyForm'
import Grid from '@mui/material/Grid'
import { LoadingButton } from '@mui/lab'
import { useRouter } from 'next/router'
import { IVacancy } from '@modules/vacancy'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import { yupResolver } from '@hookform/resolvers/yup'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import { Icon } from '@iconify/react'

function UpdateVacancy() {
  const router = useRouter()
  const {
    data: vacancy,
    isLoading,
    isValidating,
    error,
    mutate,
  } = useSWR<{ data: IVacancy }>(`/vacancies/${router.query.slug}`, getFetcher)
  const {
    data: vacancyCategories,
  } = useSWR<{ data: IVacancyCategory[] }>('/vacancy-categories')
  const {
    trigger,
    isMutating,
  } = useSWRMutation(['/vacancies', vacancy?.data.id], updateFetcher)
  const {
    formState: {errors},
    handleSubmit,
    setValue,
    control,
    reset,
  } = useForm<VacancyFormData>({
    mode: 'onBlur',
    defaultValues: {
      name: vacancy?.data.name,
      short_description: vacancy?.data.short_description,
      description: vacancy?.data.description,
      vacancy_category_id: vacancy?.data.category?.id,
    },
    resolver: yupResolver(updateVacancyScheme)
  })

  const onSubmit: SubmitHandler<VacancyFormData> = async (data) => {
    try {
      const response = await trigger(data)
      toast.success(response.message)
      await mutate()
    } catch (e) {
      const error = e as AxiosError<{ message: string }>
      toast.error(error.response?.data.message || 'Произошла ошибка')
    }
  }

  if (error) {
    return <Error500/>
  }

  if (!vacancyCategories || !vacancy || isValidating || isLoading || isMutating) {
    return <Loader/>
  }

  return (
    <CustomCard>
      <CustomPageHeader
        title={<>
          <IconButton
            title="Назад"
            sx={{mr: 4}}
            href="/main/vacancies"
            component={Link}
          >
            <Icon icon="ep:back"/>
          </IconButton>
          {vacancy?.data?.name}
        </>}
        withButton={false}
      />
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <VacancyForm
          description={vacancy.data.description}
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

export { UpdateVacancy }
