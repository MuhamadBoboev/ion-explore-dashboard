import { create } from 'zustand'
import { IEntertainment } from './IEntertainment'
// import { IEntertainment } from '@modules/entertainment'

type State = {
  open: boolean
  update: IEntertainment | null
}

type Action = {
  handleCreateOpen(): void
  handleCreateClose(): void
  handleUpdateOpen(data: State['update']): void
  handleUpdateClose(): void
}

export const useEntertainmentStore = create<State & Action>(set => ({
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
