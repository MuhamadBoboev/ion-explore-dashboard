// ** React Imports
import { useState, ReactNode } from 'react'

// ** MUI Components
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { parsePhoneNumber } from 'libphonenumber-js'
import { checkPhoneNumber } from '@shared/lib/checkPhoneNumber'
import { checkEmail } from '@shared/lib/checkEmail'
import { normalizePhoneNumber } from '@shared/lib/normalizePhoneNumber'
import { removeSpaces } from '@shared/lib/removeSpaces'

// ** Styled Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  [theme.breakpoints.down(1540)]: {
    // maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    // maxHeight: 500
  }
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

yup.addMethod(yup.string, 'checkContact', function (errorMessage) {
  return this.test(`check-contact`, errorMessage, function (value) {
    const { path, createError } = this
    let message = ''
    let isValid = true
    value = value || '1'
    try {
      const phoneNumber = parsePhoneNumber(value, 'TJ')
      if (!(phoneNumber.country === 'TJ' && checkPhoneNumber(value))) {
        message = 'Неверный формат номера телефона или email'
        isValid = false
      }
      if (!value.startsWith('+992')) {
        message = 'Номер телефона должен начинаться с +992'
        isValid = false
      }
    } catch (e) {
      if (!checkEmail(value)) {
        message = 'Неверный формат номера телефона или email'
        isValid = false
      }
    }

    return (
      isValid ||
      createError({ path, message: errorMessage || message })
    )
  })
})


const schema = yup.object().shape({
  contact: yup.string()
    .transform(removeSpaces)// @ts-ignore
    .checkContact()
    .required('Введите ваш номер телефона или Email'),
  password: yup.string().min(6, 'Мин. кол-во символов 6').required('Введите ваш пароль')
})

const defaultValues = {
  password: '',
  contact: ''
}

interface FormData {
  contact: string
  password: string
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { contact, password } = data
    auth.login({ contact, password, rememberMe }, () => {
      setError('contact', {
        type: 'manual',
        message: 'Неверный логин или пароль'
      })
    })
  }

  return (
    <Box className="content-right" sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            width: '50%',
          }}
        >
          <LoginIllustration alt="login-illustration" src={`/images/login-bg.jpg`} />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <img
              src="/images/logo-lite.svg"
              alt="Pro mebel"
            />
            <Box sx={{ my: 6 }}>
              <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
                Вход в админ панель
                <br />
                Explore Tajikistan
              </Typography>
            </Box>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="contact"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label="Номер телефона или Email"
                      value={value}
                      onBlur={onBlur}
                      onChange={(event) => {
                        event.target.value = normalizePhoneNumber(event.target.value)
                        onChange(event)
                      }}
                      error={Boolean(errors.contact)}
                      placeholder="admin@ion.tj"
                    />
                  )}
                />
                {errors.contact && <FormHelperText sx={{ color: 'error.main' }}>{errors.contact.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 1.5 }}>
                <InputLabel htmlFor="auth-login-v2-password" error={Boolean(errors.password)}>
                  Пароль
                </InputLabel>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      onBlur={onBlur}
                      label="Password"
                      onChange={onChange}
                      id="auth-login-v2-password"
                      error={Boolean(errors.password)}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }} id="">
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Box
                sx={{
                  mb: 1.75,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <FormControlLabel
                  label="Запоминть"
                  control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                />
              </Box>
              <Button fullWidth size="large" type="submit" variant="contained" sx={{ mb: 4 }}>
                Вход
              </Button>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
