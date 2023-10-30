import { KeyedMutator } from 'swr'
import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { ISpecialistCategory } from 'src/modules/specialistCategory'
import { useSpecialistStore } from '@modules/specialist/model/specialists/store'
import { SpecialistFormData, updateSpecialistScheme } from '@modules/specialist/model/specialists/SpecialistFormData'
import { SpecialistForm } from '@modules/specialist/ui/specialists/SpecialistForm'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'

interface Props {
  mutate: KeyedMutator<any>
  specialistCategories: ISpecialistCategory[]
}

function UpdateSpecialist({mutate, specialistCategories}: Props) {
  const [images, setImages] = useState<File[]>([])
  const [specialist, handleUpdateClose, handleUpdateOpen] = useSpecialistStore(
    ({handleUpdateClose, update, handleUpdateOpen}) => [update, handleUpdateClose, handleUpdateOpen]
  )
  const {trigger, isMutating} = useSWRMutation(['/specialists', specialist?.id], updateFetcher)
  const {
    trigger: triggerDeleteFile,
    isMutating: isDeleteFileMutating,
  } = useSWRMutation('/specialists', deleteFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm<SpecialistFormData>({
    defaultValues: {
      name: specialist?.name,
      description: specialist?.description,
      specialist_category_id: specialist?.category.id,
      specialization: specialist?.specialization,
      phone: specialist?.phone,
      instagram: specialist?.instagram,
      experience: specialist?.experience,
    },
    mode: 'onBlur',
    resolver: yupResolver(updateSpecialistScheme)
  })

  const onSubmit: SubmitHandler<SpecialistFormData> = async (data) => {
    try {
      const response = await trigger({...data, avatar: images[0]})
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
        {specialist?.avatar && (
          <Box display="flex" alignItems="center" mb={5}>
            <Avatar
              src={specialist.avatar}
              alt={specialist.name}
              sx={{mr: 5}}
            />
            <LoadingButton
              variant="contained"
              size="small"
              onClick={async () => {
                try {
                  // @ts-ignore
                  const response: { message: string } = await triggerDeleteFile(`${specialist.id}/avatar`)
                  await mutate()
                  toast.success(response.message)
                  handleUpdateOpen({
                    ...specialist,
                    avatar: null,
                  })
                } catch (e) {
                  const error = e as AxiosError<{ message: string }>
                  toast.error(error?.message || 'Произошла ошибка')
                }
              }}
              loading={isDeleteFileMutating}
            >
              Удалить аватарку
            </LoadingButton>
          </Box>
        )}
        <SpecialistForm
          errors={errors}
          control={control}
          images={images}
          setImages={setImages}
          setValue={setValue}
          specialistCategories={specialistCategories}
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

export { UpdateSpecialist }
