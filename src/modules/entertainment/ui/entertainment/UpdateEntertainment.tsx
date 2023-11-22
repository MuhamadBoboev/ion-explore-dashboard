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
// import { useEntertainmentStore } from '@modules/Entertainment/model/store'
// import { EntertainmentFormData, updateEntertainmentScheme } from '@modules/Entertainment/model/EntertainmentFormData'
// import { EntertainmentForm } from '@modules/Entertainment/ui/tour/EntertainmentForm'
import { ICategory, ISubcategory } from '@modules/catalog'
import Box from '@mui/material/Box'
import Link from 'next/link'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { useLanguageStore } from '@shared/model/store'
import { EntertainmentFormData, updateEntertainmentScheme } from '@modules/entertainment/model/EntertainmentFormData'
import { EntertainmentForm } from './EntertainmentForm'
import { useEntertainmentStore } from '@modules/entertainment/model/store'

interface Props {
  mutate: KeyedMutator<any>
  categories: ISubcategory[]
}

function UpdateEntertainment({ categories, mutate }: Props) {
  const [images, setImages] = useState<File[]>([])
  const [files, setFiles] = useState<File[]>([])
  const { langList, lang } = useLanguageStore(({ langList, lang }) => ({ langList, lang }))
  // langList.find((el) => el.code === lang)
  const [Entertainment, handleUpdateClose, handleUpdateOpen] = useEntertainmentStore(
    ({ handleUpdateClose, update, handleUpdateOpen }) => [update, handleUpdateClose, handleUpdateOpen]
  )
  const { trigger, isMutating } = useSWRMutation(['/entertainment', Entertainment?.id], updateFetcher)
  const {
    trigger: triggerDeleteFile,
    isMutating: isDeleteFileMutating,
  } = useSWRMutation('/tour', deleteFetcher)
  console.log(Entertainment)
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    watch,
  } = useForm<EntertainmentFormData>({
    defaultValues: {
      title: Entertainment?.title,
      description: Entertainment?.description,
      subcategory_id: Entertainment?.subcategory.id,
      lang_id: langList.find((el) => el.code == Entertainment?.lang_id)?.id
    },
    mode: 'onBlur',
    resolver: yupResolver(updateEntertainmentScheme)
  })
  const onSubmit: SubmitHandler<EntertainmentFormData> = async (data) => {
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
        {/* {Entertainment?.file && (
          <>
            <Box display="flex">
              <span
                style={{
                  flexShrink: 0,
                  marginRight: 5
                }}
              >Прикрепленный файл:</span>
              <Link
                href={Entertainment.file || '/'}
                target="_blank"
                style={{
                  width: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {Entertainment.file}
              </Link>
            </Box>
            <LoadingButton
              variant="contained"
              sx={{ mt: 4 }}
              onClick={async () => {
                try {
                  // @ts-ignore
                  const response: { message: string } = await triggerDeleteFile(`${Entertainment.id}/file`)
                  toast.success(response.message)
                  handleUpdateOpen({
                    ...Entertainment,
                    file: null,
                  })
                } catch (e) {
                  const error = e as AxiosError<{ message: string }>
                  toast.error(error?.message || 'Произошла ошибка')
                }
              }}
              loading={isDeleteFileMutating}
            >
              Удалить файл
            </LoadingButton>
          </>
        )} */}
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

export { UpdateEntertainment }
