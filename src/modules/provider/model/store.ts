import { create } from 'zustand'
import { IProvider } from '@modules/provider'

type State = {
  open: boolean
  update: IProvider | null
}

type Action = {
  handleCreateOpen(): void
  handleCreateClose(): void
  handleUpdateOpen(data: State['update']): void
  handleUpdateClose(): void
}

export const useProviderStore = create<State & Action>((set) => ({
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
