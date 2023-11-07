import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useLanguageStore } from "@shared/model/store";
import { useState } from "react";

function SelectLanguage() {
  const langList = useLanguageStore(({ langList }) => langList)
  const [lang, setLang] = useState(langList);

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value)
    // debugger
    // setLang(event.target.value);
  };
  return (

    <Select
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
    </Select>

  )
}

export { SelectLanguage }


