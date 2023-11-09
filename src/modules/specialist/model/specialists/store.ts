import { create } from 'zustand'
import { ISpecialist } from '@modules/specialist/model/specialists/ISpecialist'

type State = {
  open: boolean
  update: ISpecialist | null
}

type Action = {
  handleCreateOpen(): void
  handleCreateClose(): void
  handleUpdateOpen(data: State['update']): void
  handleUpdateClose(): void
}

export const useSpecialistStore = create<State & Action>(set => ({
  open: false,
  update: null,
  handleCreateOpen() {
    set(() => ({ open: true }))
  },
  handleCreateClose() {
    set(() => ({ open: false }))
  },
  handleUpdateOpen(data) {
    console.log('open')
    set(() => ({ update: data }))
  },
  handleUpdateClose() {
    set(() => ({ update: null }))
  }
}))
