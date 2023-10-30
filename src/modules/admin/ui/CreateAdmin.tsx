import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useAdminStore } from '@modules/admin/model/store'
import { AdminFormData, createAdminScheme } from '@modules/admin/model/AdminFormData'
import { KeyedMutator } from 'swr'
import { AdminForm } from '@modules/admin/ui/AdminForm'
import { IRole } from '@shared/model/IRole'

interface Props {
  mutate: KeyedMutator<any>
  roles: IRole[]
}

function CreateAdmin({mutate, roles}: Props) {
  const {trigger, isMutating} = useSWRMutation('/users', postFetcher)
  const [handleCreateClose] = useAdminStore(({handleCreateClose}) => [handleCreateClose])
  const {
    control,
    formState: {errors},
    handleSubmit,
    setError,
  } = useForm<AdminFormData>({
    mode: 'onBlur',
    defaultValues: {
      role_ids: roles.filter(({key}) => key === 'manager').map(({id}) => id) || [],
    },
    resolver: yupResolver(createAdminScheme)
  })

  const onSubmit: SubmitHandler<AdminFormData> = async (data) => {
    const adminId = roles.find(({key}) => key === 'admin')?.id!
    const managerId = roles.find(({key}) => key === 'manager')?.id!
    if (!data.role_ids.includes(adminId) && !data.role_ids.includes(managerId)) {
      setError('role_ids', {
        message: 'Выберите роль'
      })
      return
    }
    const userRole = roles.find(({key}) => key === 'user')!
    try {
      const response = await trigger({...data, role_ids: [...data.role_ids, userRole.id]})
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
        <AdminForm
          errors={errors}
          control={control}
          roles={roles}
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

export { CreateAdmin }
