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
import { useProviderStore } from '@modules/provider/model/store'
import { ProviderFormData, updateProviderScheme } from '@modules/provider/model/ProviderFormData'
import { ProviderForm } from '@modules/provider/ui/tour/ProviderForm'
import { ICategory, ISubcategory } from '@modules/catalog'
import Box from '@mui/material/Box'
import Link from 'next/link'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { useLanguageStore } from '@shared/model/store'

interface Props {
  mutate: KeyedMutator<any>
  categories: ISubcategory[]
}

function UpdateProvider({ categories, mutate }: Props) {
  const [images, setImages] = useState<File[]>([])
  const [files, setFiles] = useState<File[]>([])
  const { langList, lang } = useLanguageStore(({ langList, lang }) => ({ langList, lang }))
  // langList.find((el) => el.code === lang)
  const [provider, handleUpdateClose, handleUpdateOpen] = useProviderStore(
    ({ handleUpdateClose, update, handleUpdateOpen }) => [update, handleUpdateClose, handleUpdateOpen]
  )
  const { trigger, isMutating } = useSWRMutation(['/tour', provider?.id], updateFetcher)
  const {
    trigger: triggerDeleteFile,
    isMutating: isDeleteFileMutating,
  } = useSWRMutation('/tour', deleteFetcher)
  // console.log(provider)
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    watch,
  } = useForm<ProviderFormData>({
    defaultValues: {
      name: provider?.name,
      description: provider?.description,
      latitude: provider?.latitude,
      image: provider?.image,
      longitude: provider?.longitude,
      subcategory_id: provider?.subcategory.id,
      lang_id: langList.find((el) => el.code == provider?.lang_id)?.id,
      region: provider?.region
    },
    mode: 'onBlur',
    resolver: yupResolver(updateProviderScheme)
  })
  const onSubmit: SubmitHandler<ProviderFormData> = async (data) => {
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
        {/* {provider?.file && (
          <>
            <Box display="flex">
              <span
                style={{
                  flexShrink: 0,
                  marginRight: 5
                }}
              >Прикрепленный файл:</span>
              <Link
                href={provider.file || '/'}
                target="_blank"
                style={{
                  width: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {provider.file}
              </Link>
            </Box>
            <LoadingButton
              variant="contained"
              sx={{ mt: 4 }}
              onClick={async () => {
                try {
                  // @ts-ignore
                  const response: { message: string } = await triggerDeleteFile(`${provider.id}/file`)
                  toast.success(response.message)
                  handleUpdateOpen({
                    ...provider,
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

export { UpdateProvider }
