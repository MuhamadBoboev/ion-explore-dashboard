import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { Control } from 'react-hook-form'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FetchStatus } from '@shared/model/FetchStatus'
import { sendOtp } from '@shared/api/sendOtp'
import toast from 'react-hot-toast'
import { BarLoader } from '@shared/ui/BarLoader'

interface Props {
  disabled: boolean
  otpFetchStatus: FetchStatus
  setOtpFetchStatus: Dispatch<SetStateAction<FetchStatus>>
  errorMessage?: string
  value?: string
  control: Control<any>
}

function Otp({control, errorMessage, otpFetchStatus, setOtpFetchStatus, disabled, value}: Props) {
  const [timer, setTimer] = useState(30)
  const [isTimerShow, setIsTimerShow] = useState(false)
  const sendOtpContent = {
    normal: 'Получить код',
    pending: (
      <BarLoader
        color="#fff"
        width={20}
        height={20}
        size={3}
      />
    ),
    fulfilled: 'Получить код',
    rejected: 'Получить код'
  }

  useEffect(() => {
    let time: ReturnType<typeof setTimeout>
    if (isTimerShow) {
      if (timer >= 1) {
        time = setTimeout(() => {
          setTimer(timer - 1)
        }, 1000)
      } else {
        setIsTimerShow(false)
        setTimer(30)
      }
    }

    return () => {
      clearTimeout(time)
    }
  }, [isTimerShow, timer])

  return (
    <Grid container spacing={4}>
      <Grid item xs={5}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{height: 56}}
          disabled={disabled || isTimerShow}
          onClick={async () => {
            setOtpFetchStatus('pending')
            const {message, success} = await sendOtp(value || '')
            toast[success ? 'success' : 'error'](message)
            if (success) {
              setIsTimerShow(true)
            }
            setOtpFetchStatus(success ? 'fulfilled' : 'rejected')
          }}
        >
          {sendOtpContent[otpFetchStatus]}
        </Button>
        {isTimerShow && <small>
          Отправить код повторно можно через {timer}
        </small>}
      </Grid>
      <Grid item xs={7}>
        <TextFieldCustom
          name="otp"
          control={control}
          label="Код подтверждения"
          errorMessage={errorMessage}
          typeNumber
        />
      </Grid>
    </Grid>
  )
}

export { Otp }
