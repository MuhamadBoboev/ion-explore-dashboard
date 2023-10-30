import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { FileUploader } from '@shared/ui/FileUploader'
import { SpecialistFormData } from '@modules/specialist/model/specialists/SpecialistFormData'
import InputLabel from '@mui/material/InputLabel'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import ModalFormControl from '@shared/ui/ModalFormControl'
import { ISpecialistCategory } from 'src/modules/specialistCategory'

interface Props {
  errors: FieldErrors<SpecialistFormData>
  control: Control<SpecialistFormData>
  images: File[]
  setImages: Dispatch<SetStateAction<File[]>>
  setValue: UseFormSetValue<SpecialistFormData>
  specialistCategories: ISpecialistCategory[]
}

function SpecialistForm({control, errors, images, setImages, setValue, specialistCategories}: Props) {

  return (
    <>
      <FileUploader
        title="Выберите аватарку"
        files={images}
        setFiles={setImages}
        errorMessage={errors.avatar?.message}
        control={control}
        setValue={setValue}
        name="image"
      />
      <TextFieldCustom
        name="name"
        control={control}
        label="Имя"
        errorMessage={errors.name?.message}
        required
      />
      <TextFieldCustom
        name="description"
        control={control}
        label="Описание"
        errorMessage={errors.description?.message}
        textFieldProps={() => ({
          multiline: true,
          rows: 4,
        })}
      />
      <ModalFormControl errorMessage={errors.specialist_category_id?.message}>
        <InputLabel id="select-specialist-category">Категория *</InputLabel>
        <Controller
          name="specialist_category_id"
          control={control}
          render={({field}) => (
            <Select
              labelId="select-specialist-category-label"
              id="select-specialist-category"
              label="Категория *"
              {...field}
              required
            >
              {specialistCategories.map(({id, name}) => (
                <MenuItem key={id} value={id}>{name}</MenuItem>
              ))}
            </Select>
          )}
        />
      </ModalFormControl>
      <TextFieldCustom
        name="specialization"
        control={control}
        label="Специализация"
        errorMessage={errors.specialization?.message}
        required
      />
      <TextFieldCustom
        name="experience"
        control={control}
        label="Опыт работы"
        errorMessage={errors.experience?.message}
      />
      <TextFieldCustom
        name="phone"
        control={control}
        label="Номер телефона"
        errorMessage={errors.phone?.message}
      />
      <TextFieldCustom
        name="instagram"
        control={control}
        label="Instagram"
        errorMessage={errors.instagram?.message}
      />
    </>
  )
}

export { SpecialistForm }
