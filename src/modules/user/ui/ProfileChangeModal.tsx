import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { useAuth } from '../../../hooks/useAuth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UpdateProfileFormData, updateProfileSchema } from '@modules/user/model/UpdateProfileFormData'
import { yupResolver } from '@hookform/resolvers/yup'
import { changeProfile } from '@modules/user/api/changeProfile'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { normalizePhoneNumber } from '@shared/lib/normalizePhoneNumber'
import Button from '@mui/material/Button'
import toast from 'react-hot-toast'
import { useCallback, useState } from 'react'
import { FetchStatus } from '@shared/model/FetchStatus'
import { BarLoader } from '@shared/ui/BarLoader'
import { checkDisableSendCode } from '@modules/user/lib/checkDisableSendCode'
import { Otp } from '@modules/user/ui/Otp'

interface Props {
  handleClose(): void
}

function ProfileChangeModal({ handleClose }: Props) {
  const { user } = useAuth()
  const [otpFetchStatus, setOtpFetchStatus] = useState<FetchStatus>('normal')
  const [submitStatus, setSubmitStatus] = useState<FetchStatus>('normal')

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    getValues,
  } = useForm<UpdateProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      contact: user?.email || user?.phone || '',
      address: user?.address || '',
    },
    mode: 'onBlur',
    resolver: yupResolver(updateProfileSchema)
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

  const isDisableSendCode = useCallback(() => {
    return checkDisableSendCode(getValues('contact'))
  }, [watch('contact')])

  const onSubmit: SubmitHandler<UpdateProfileFormData> = async (data) => {
    setSubmitStatus('pending')
    const response = await changeProfile(data)
    if (!response.success) {
      toast.error(response.message)
      setSubmitStatus('rejected')

      return
    }
    setSubmitStatus('fulfilled')
    toast.success(response.message)
    // await initAuth()
  }

  return (
    <CustomDialog
      title="Изменить профиль"
      handleClose={handleClose}
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <TextFieldCustom
          name="name"
          control={control}
          label="Имя"
          errorMessage={errors.name?.message}
        />
        <TextFieldCustom
          name="contact"
          control={control}
          label="Номер телефона или Email"
          errorMessage={errors.contact?.message}
          textFieldProps={(field: any) => ({
            onChange(event) {
              event.target.value = normalizePhoneNumber(event.target.value)
              if (field.onChange) {
                field.onChange()
              }
            }
          })}
        />
        <Otp
          control={control}
          otpFetchStatus={otpFetchStatus}
          setOtpFetchStatus={setOtpFetchStatus}
          errorMessage={errors.otp?.message}
          disabled={!isDisableSendCode() || otpFetchStatus === 'pending'}
          value={getValues('contact')}
        />
        <TextFieldCustom
          name="address"
          control={control}
          label="Адрес"
          errorMessage={errors.address?.message}
        />
        <Button
          fullWidth
          size="large"
          variant="contained"
          sx={{ height: 56, mt: 3 }}
          type="submit"
        >
          {submitContent[submitStatus]}
        </Button>
      </form>
    </CustomDialog>
  )
}

export { ProfileChangeModal }
