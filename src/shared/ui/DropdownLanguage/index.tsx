import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { useLanguageStore } from '@shared/model/store'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function DropdownLanguage() {
  const { selectLang, langList, lang } = useLanguageStore(({ selectLang, langList, lang }) => ({ selectLang, langList, lang }))
  const router = useRouter()

  useEffect(() => {
    if (router.query.lang) {
      if (langList.find(({ code }) => code === router.query.lang)) {
        selectLang(router.query.lang as string)
      }
    }
  }, [router, langList])

  return (
    <Select
      value={lang}
      onChange={(event) => {
        const target = event.target as HTMLInputElement
        selectLang(target.value)
        router.query.lang = target.value
        router.push(router)
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
