import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { BannerFormData } from '@modules/banner/model/BannerFormData'
import { Dispatch, SetStateAction } from 'react'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import ModalFormControl from '@shared/ui/ModalFormControl'
import InputLabel from '@mui/material/InputLabel'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { FileUploader } from '@shared/ui/FileUploader'

interface Props {
  errors: FieldErrors<BannerFormData>
  control: Control<BannerFormData>
  images: File[]
  setImages: Dispatch<SetStateAction<File[]>>
  setValue: UseFormSetValue<BannerFormData>
}

function BannerForm({control, errors, images, setImages, setValue}: Props) {

  return (
    <>
      <FileUploader
        title="Выберите изображение"
        files={images}
        setFiles={setImages}
        errorMessage={errors.image?.message}
        control={control}
        setValue={setValue}
        name="image"
      />
      <TextFieldCustom
        name="title"
        control={control}
        label="Заголовок"
        errorMessage={errors.title?.message}
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
      <TextFieldCustom
        name="button_text"
        control={control}
        label="Текст кнопки"
        errorMessage={errors.button_text?.message}
      />
      <TextFieldCustom
        name="link"
        control={control}
        label="Ссылка кнопки"
        errorMessage={errors.link?.message}
      />
      <ModalFormControl errorMessage={errors.type?.message}>
        <InputLabel id="select-banner-type">Расположения баннера *</InputLabel>
        <Controller
          name="type"
          control={control}
          render={({field}) => (
            <Select
              labelId="select-banner-type-label"
              id="select-banner-type"
              label="Расположения баннера *"
              {...field}
              required
            >
              <MenuItem value="main">Первый экран</MenuItem>
              <MenuItem value="secondary">В середине</MenuItem>
              <MenuItem value="tertiary">Внизу</MenuItem>
            </Select>
          )}
        />
      </ModalFormControl>
      <TextFieldCustom
        name="order"
        control={control}
        label="Порядок"
        errorMessage={errors.order?.message}
        typeNumber
      />
    </>
  )
}

export { BannerForm }
