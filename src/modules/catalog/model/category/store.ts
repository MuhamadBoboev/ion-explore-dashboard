import { create } from 'zustand'
import { ICategory } from '@modules/catalog'

type State = {
  open: boolean
  update: ICategory | null
}

type Action = {
  handleCreateOpen(): void
  handleCreateClose(): void
  handleUpdateOpen(data: State['update']): void
  handleUpdateClose(): void
}

export const useCategoryStore = create<State & Action>((set) => ({
  open: false,
  update: null,
  handleCreateOpen() {
    set(() => ({open: true}))
  },
  handleCreateClose() {
    set(() => ({open: false}))
  },
  handleUpdateOpen(data) {
    set(() => ({update: data}))
  },
  handleUpdateClose() {
    set(() => ({update: null}))
  },
}))
