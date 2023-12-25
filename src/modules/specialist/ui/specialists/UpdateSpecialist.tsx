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
import { useSpecialistStore } from '@modules/specialist/model/specialists/store'
import { SpecialistFormData, updateSpecialistScheme } from '@modules/specialist/model/specialists/SpecialistFormData'
import { SpecialistForm } from '@modules/specialist/ui/specialists/SpecialistForm'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { useLanguageStore } from '@shared/model/store'

interface Props {
  mutate: KeyedMutator<any>
}

function UpdateSpecialist({ mutate }: Props) {
  const lang = useLanguageStore(({ langList, lang }) => langList.find(({ code }) => code === lang))
  // console.log(lang)
  const [images, setImages] = useState<File[]>([])
  const [specialist, handleUpdateClose, handleUpdateOpen] = useSpecialistStore(
    ({ handleUpdateClose, update, handleUpdateOpen }) => [update, handleUpdateClose, handleUpdateOpen]
  )
  const { trigger, isMutating } = useSWRMutation([`/guide`, specialist?.id], updateFetcher)
  const {
  } = useSWRMutation('/guide', deleteFetcher)
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<SpecialistFormData>({
    defaultValues: {
      image: specialist?.image,
      name: specialist?.name,
      lang_id: lang?.id,
      speciality: specialist?.speciality,
      description: specialist?.description
    },
    mode: 'onBlur',
    resolver: yupResolver(updateSpecialistScheme)
  })

  const onSubmit: SubmitHandler<SpecialistFormData> = async (data) => {
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
        {specialist?.image && (
          <Box display="flex" alignItems="center" mb={5}>
            <Avatar
              src={specialist.image}
              alt={specialist.name}
              sx={{ mr: 5 }}
            />
          </Box>
        )}
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

export { UpdateSpecialist }
