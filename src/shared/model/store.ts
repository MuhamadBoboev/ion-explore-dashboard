import { create } from 'zustand'
import { ILang } from './ILang'

type State = {
  timeLang: string
  lang: string | null
  langList: ILang[]
}

type Action = {
  loadLang(langs: ILang[]): void
  selectLang(lang: string): void
}

let langStorage = localStorage.getItem('lang')
export const useLanguageStore = create<State & Action>(set => ({
  timeLang: 'asd',
  lang: langStorage,
  langList: [],
  loadLang(langList) {
    set(() => ({ langList }))
  },
  selectLang(lang: 'ru') {
    localStorage.setItem('lang', lang)
    set(() => ({ lang }))
  }
}))

export const langIdSelector = ({ lang, langList }: { lang: string; langList: ILang[] }) =>
  langList.find(({ code }) => code === lang)?.id
export const langSelector = ({ lang }: { lang: string }) => lang
