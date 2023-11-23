import { create } from 'zustand'
import { ILang } from './ILang'

type State = {
  lang: string | null
  langList: ILang[]
}

type Action = {
  loadLang(langs: ILang[]): void
  selectLang(lang: string): void
}

export const useLanguageStore = create<State & Action>(set => ({
  lang: 'ru',
  langList: [],
  loadLang(langList) {
    set(() => ({ langList }))
  },
  selectLang(lang: 'ru') {
    set(() => ({ lang }))
  }
}))

export const langIdSelector = ({ lang, langList }: { lang: string; langList: ILang[] }) =>
  langList.find(({ code }) => code === lang)?.id
export const langSelector: any = ({ lang }: { lang: string }) => lang
