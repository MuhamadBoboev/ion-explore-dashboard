import { Control, FieldErrors } from 'react-hook-form'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { EnterContactFormData } from '@modules/enterContact/model/enterContacts/enterContactFormData'
import { LangForm } from '@shared/ui/LangForm'

interface Props {
  // services: any
  errors: FieldErrors<EnterContactFormData>
  control: Control<EnterContactFormData>
  // images: File[]
  // setImages: Dispatch<SetStateAction<File[]>>
  // setValue: UseFormSetValue<CategoryFormData>
}

function EnterContactForm({ control, errors }: Props) {


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
        name="address"
        control={control}
        label="Адресс"
        errorMessage={errors.address?.message}
        required
      />
      <TextFieldCustom
        name="phone"
        control={control}
        label="Телефон"
        errorMessage={errors.phone?.message}
        required
      />
      <TextFieldCustom
        name="whatsapp"
        control={control}
        label="Whatsapp"
        errorMessage={errors.whatsapp?.message}
        required
      />
      <TextFieldCustom
        name="latitude"
        control={control}
        label="latitude"
        errorMessage={errors.latitude?.message}
        required
      />
      <TextFieldCustom
        name="longitude"
        control={control}
        label="longitude"
        errorMessage={errors.longitude?.message}
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

export { EnterContactForm }
