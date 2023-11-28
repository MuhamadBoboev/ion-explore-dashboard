import { create } from 'zustand'
import { ICategory } from '@modules/catalog'
import { IStepsItem } from '@modules/provider/model/ITour'

type State = {
  open: boolean
  update: IStepsItem | null
}

type Action = {
  handleCreateOpen(): void
  handleCreateClose(): void
  handleUpdateOpen(data: State['update']): void
  handleUpdateClose(): void
}

export const useCategoryStore = create<State & Action>(set => ({
  open: false,
  update: null,
  handleCreateOpen() {
    set(() => ({ open: true }))
  },
  handleCreateClose() {
    set(() => ({ open: false }))
  },
  handleUpdateOpen(data) {
    set(() => ({ update: data }))
  },
  handleUpdateClose() {
    set(() => ({ update: null }))
  }
}))
