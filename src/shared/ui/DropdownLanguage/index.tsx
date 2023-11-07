import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { useLanguageStore } from '@shared/model/store'

function DropdownLanguage() {
  const { selectLang, langList, lang } = useLanguageStore(({ selectLang, langList, lang }) => ({ selectLang, langList, lang }))

  return (
    <Select
      value={lang}
      onChange={(event) => {
        selectLang(event.target.value)
      }}
      size="small"
      sx={{ mr: 5 }}
    >
      {langList.map(({ code, name }) => (
        <MenuItem key={code} value={code}>{name}</MenuItem>
      ))}
    </Select>
  )
}

export { DropdownLanguage }
