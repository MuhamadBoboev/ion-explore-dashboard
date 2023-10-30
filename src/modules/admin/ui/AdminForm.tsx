import { Control, Controller, FieldErrors } from 'react-hook-form'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import ModalFormControl from '@shared/ui/ModalFormControl'
import InputLabel from '@mui/material/InputLabel'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { AdminFormData } from '@modules/admin/model/AdminFormData'
import { IRole } from '@shared/model/IRole'

interface Props {
  errors: FieldErrors<AdminFormData>
  control: Control<AdminFormData>
  roles: IRole[]
  type?: 'create' | 'update'
}

function AdminForm({control, errors, roles, type = 'create'}: Props) {

  return (
    <>
      <TextFieldCustom
        name="name"
        control={control}
        label="Имя"
        errorMessage={errors.name?.message}
        required
      />
      <TextFieldCustom
        name="email"
        control={control}
        label="Email"
        errorMessage={errors.email?.message}
        required
      />
      <TextFieldCustom
        name="password"
        control={control}
        label="Пароль"
        errorMessage={errors.password?.message}
        required={type === 'create'}
      />
      <ModalFormControl errorMessage={errors.role_ids?.message}>
        <InputLabel id="select-roles">Роли *</InputLabel>
        <Controller
          name="role_ids"
          control={control}
          render={({field}) => (
            <Select
              labelId="select-roles-label"
              id="select-roles"
              label="Роли *"
              multiple
              required
              {...field}
            >
              {roles.filter(({key}) => key !== 'user').map(({id, name}) => (
                <MenuItem key={id} value={id}>{name}</MenuItem>
              ))}
            </Select>
          )}
        />
      </ModalFormControl>
    </>
  )
}

export { AdminForm }
