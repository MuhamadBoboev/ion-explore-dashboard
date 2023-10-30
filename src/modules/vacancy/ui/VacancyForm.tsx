import { IVacancyCategory } from '@modules/vacancyCategory'
import Grid from '@mui/material/Grid'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { VacancyFormData } from '@modules/vacancy/model/VacancyFormData'
import ModalFormControl from '@shared/ui/ModalFormControl'
import InputLabel from '@mui/material/InputLabel'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { EditorWrapper } from '../../../@core/styles/libs/react-draft-wysiwyg'
import ReactDraftWysiwyg from '../../../@core/components/react-draft-wysiwyg'
import { useEffect, useState } from 'react'
import { EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { stateFromHTML } from 'draft-js-import-html'

interface Props {
  description: string | null
  vacancyCategories: IVacancyCategory[]
  control: Control<VacancyFormData>
  errors: FieldErrors<VacancyFormData>
  setValue: UseFormSetValue<VacancyFormData>
}

function VacancyForm({vacancyCategories, control, errors, setValue, description}: Props) {
  const [descriptionState, setDescriptionState] = useState(
    EditorState.createWithContent(stateFromHTML(description || ''))
  )

  useEffect(() => {
    setValue('description', stateToHTML(descriptionState.getCurrentContent()))
  }, [descriptionState])

  return (
    <Grid
      container
      spacing={5}
      p={8}
      boxSizing="border-box"
    >
      <Grid item xs={6}>
        <TextFieldCustom
          name="name"
          control={control}
          label="Название"
          errorMessage={errors.name?.message}
          required
        />
      </Grid>
      <Grid item xs={6}>
        <ModalFormControl errorMessage={errors.vacancy_category_id?.message}>
          <InputLabel id="select-vacancy_category">Категория</InputLabel>
          <Controller
            name="vacancy_category_id"
            control={control}
            render={({field}) => (
              <Select
                labelId="select-vacancy_category-label"
                id="select-vacancy_category"
                label="Категория"
                {...field}
                required
              >
                <MenuItem value={undefined}>Без категории</MenuItem>
                {vacancyCategories.map(({id, name}) => (
                  <MenuItem key={id} value={id}>{name}</MenuItem>
                ))}
              </Select>
            )}
          />
        </ModalFormControl>
      </Grid>
      <Grid item xs={12}>
        <TextFieldCustom
          name="short_description"
          control={control}
          label="Краткое описание"
          errorMessage={errors.short_description?.message}
          textFieldProps={() => ({
            rows: 4,
            multiline: true,
          })}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" mb={2}>Описание *</Typography>
        <EditorWrapper>
          <ReactDraftWysiwyg
            editorState={descriptionState}
            onEditorStateChange={setDescriptionState}
          />
          <Controller
            name="description"
            control={control}
            render={({field}: any) => (
              <input
                type="hidden"
                {...field}
              />
            )}
          />
        </EditorWrapper>
      </Grid>
    </Grid>
  )
}

export { VacancyForm }
