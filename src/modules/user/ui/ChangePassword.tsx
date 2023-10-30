import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { useState } from 'react'
import { FetchStatus } from '@shared/model/FetchStatus'
import { BarLoader } from '@shared/ui/BarLoader'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UpdatePasswordFormData, updatePasswordScheme } from '@modules/user/model/UpdatePasswordFormData'
import { changePassword } from '@modules/user/api/changePassword'
import toast from 'react-hot-toast'
import { yupResolver } from '@hookform/resolvers/yup'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import Button from '@mui/material/Button'

interface Props {
  handleClose(): void
}

function ChangePassword({handleClose}: Props) {
  const [submitStatus, setSubmitStatus] = useState<FetchStatus>('normal')
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<UpdatePasswordFormData>({
    mode: 'onBlur',
    resolver: yupResolver(updatePasswordScheme)
  })

  const submitContent = {
    normal: 'Отправить',
    pending: (
      <BarLoader
        color="#fff"
        width={20}
        height={20}
        size={3}
      />
    ),
    fulfilled: 'Отправить',
    rejected: 'Отправить',
  }

  const onSubmit: SubmitHandler<UpdatePasswordFormData> = async data => {
    setSubmitStatus('pending')
    const response = await changePassword(data)
    if (!response.success) {
      toast.error(response.message)
      setSubmitStatus('rejected')

      return
    }
    handleClose()
    toast.success(response.message)
    setSubmitStatus('fulfilled')
  }

  return (
    <CustomDialog
      title="Изменить профиль"
      handleClose={handleClose}
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <TextFieldCustom
          name="old_password"
          control={control}
          label="Текущий пароль"
          errorMessage={errors.old_password?.message}
        />
        <TextFieldCustom
          name="password"
          control={control}
          label="Новый пароль"
          errorMessage={errors.password?.message}
        />
        <TextFieldCustom
          name="password_confirmation"
          control={control}
          label="Подтверждение пароли"
          errorMessage={errors.password_confirmation?.message}
        />
        <Button
          fullWidth
          size="large"
          variant="contained"
          sx={{height: 56, mt: 3}}
          type="submit"
        >
          {submitContent[submitStatus]}
        </Button>
      </form>
    </CustomDialog>
  )
}

export { ChangePassword }
