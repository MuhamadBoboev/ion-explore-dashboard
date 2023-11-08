import { InputLabel, MenuItem, Select } from "@mui/material";
import { useLanguageStore } from "@shared/model/store";
import { Control, Controller } from "react-hook-form";
import ModalFormControl from "../ModalFormControl";

interface Props {
  errorMessage?: string
  control: Control<any>
}

function LangForm({ errorMessage, control }: Props) {
  const { lang, langList } = useLanguageStore(({ lang, langList }) => ({ lang, langList }))

  return (
    <ModalFormControl errorMessage={errorMessage}>
      <InputLabel id="lang_id">Язык *</InputLabel>
      <Controller
        name="lang_id"
        control={control}
        render={({ field }) => (
          <Select
            labelId="lang_id-label"
            id="lang_id"
            label="Язык *"
            defaultValue={langList.find(({ code }) => code === lang)?.id}
            {...field}
          // required
          >
            {langList.map(({ id, name }) => (
              <MenuItem value={id}>{name}</MenuItem>
            ))}
          </Select>
        )}
      />
    </ModalFormControl>
  )
}

export { LangForm }


