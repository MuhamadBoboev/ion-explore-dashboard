import { Control, Controller, FieldErrors } from 'react-hook-form'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
// import { IService } from '@modules/service'
import InputLabel from '@mui/material/InputLabel'
import { FormControl, Select, SelectChangeEvent } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import ModalFormControl from '@shared/ui/ModalFormControl'
import { langIdSelector, useLanguageStore } from '@shared/model/store'
import { useState } from 'react'
import { ILang } from '@shared/model/ILang'
import { langSelector } from '../../../shared/model/store';
import { LangForm } from '@shared/ui/LangForm'
import { CategoryFormData } from '../model/CategoryFormData'
// import { SelectLanguage } from '@shared/ui/SelectLanguage'

interface Props {
  services: any
  errors: FieldErrors<CategoryFormData>
  control: Control<CategoryFormData>
  // images: File[]
  // setImages: Dispatch<SetStateAction<File[]>>
  // setValue: UseFormSetValue<CategoryFormData>
}

function CategoryForm({ control, errors, services }: Props) {


  // debugger
  // console.log(services)
  // const langList = useLanguageStore(({ langList }) => langList)
  // const [lang, setLang] = useState(langList);
  // console.log(lang)

  // const handleChange = (event: SelectChangeEvent) => {
  //   // debugger
  //   setLang(event.target.value);
  // };

  return (
    <>
      {/*<FileUploader*/}
      {/*  title="Выберите иконку"*/}
      {/*  files={images}*/}
      {/*  setFiles={setImages}*/}
      {/*  errorMessage={errors.icon?.message}*/}
      {/*  control={control}*/}
      {/*  setValue={setValue}*/}
      {/*  name="icon"*/}
      {/*/>*/}
      <TextFieldCustom
        name="name"
        control={control}
        label="Название"
        errorMessage={errors.name?.message}
        required
      />
      <TextFieldCustom
        name="step"
        control={control}
        label="Шаги"
        errorMessage={errors.step?.message}
        required
      />
      <TextFieldCustom
        name="description"
        control={control}
        label="Описания"
        errorMessage={errors.description?.message}
        required
      />
      <TextFieldCustom
        name="order"
        control={control}
        label="Этап"
        errorMessage={errors.order?.message}
        typeNumber
        required
      />
      {/* <TextFieldCustom
        name="lang_id"
        control={control}
        label="Язык"
        errorMessage={errors.lang_id?.message}
        required
      /> */}
      {/* <LangForm control={control} errorMessage={errors.lang_id?.message} /> */}
      {/* <Select
        name="lang_id"
        labelId="lang_id"
        id="select-service_ids"
        label="Доступные услуги"
        required={true}
        multiple
        onChange={handleChange}
        value={lang}
      >
        {langList.map(({ id, name }) => (
          <MenuItem key={id} value={id}>{name}</MenuItem>
        ))}
      </Select> */}
      {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={'ru'}
          label="Age"
          onChange={handleChange}
        >
          {langList.map((lang: ILang) =>
            <MenuItem value={lang.id}>{lang.name}</MenuItem>
          )}
        </Select>
      </FormControl> */}
      {/* <Controller
          name="id"
          control={control}
          render={({ field }) => (
            <Select
              labelId="select-service_ids-label"
              id="select-service_ids"
              label="Доступные услуги"
              {...field}
              required={true}
              multiple
            >
              {services.map(({ id, name }) => (
                <MenuItem key={id} value={id}>{name}</MenuItem>
              ))}
            </Select>
          )}
        /> */}
      {/* <TextFieldCustom
        name="description"
        control={control}
        label="Описание"
        errorMessage={errors.lang_id?.message}
        textFieldProps={() => ({
          multiline: true,
          rows: 4,
        })}
      /> */}
      {/* <ModalFormControl errorMessage={errors.lang_id?.message}>
        <InputLabel id="select-service_ids">Доступные услуги</InputLabel>
        <Controller
          name="id"
          control={control}
          render={({ field }) => (
            <Select
              labelId="select-service_ids-label"
              id="select-service_ids"
              label="Доступные услуги"
              {...field}
              required={true}
              multiple
            >
              {services.map(({ id, name }) => (
                <MenuItem key={id} value={id}>{name}</MenuItem>
              ))}
            </Select>
          )}
        />
      </ModalFormControl> */}
      {/* <TextFieldCustom
        name="order"
        control={control}
        label="Порядок"
        errorMessage={errors.order?.message}
        typeNumber
      /> */}
    </>
  )
}

export { CategoryForm }
