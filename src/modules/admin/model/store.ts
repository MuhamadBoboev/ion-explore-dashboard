import { create } from 'zustand'
import { IUser } from '@modules/user'

type State = {
  open: boolean
  update: IUser | null
}

type Action = {
  handleCreateOpen(): void
  handleCreateClose(): void
  handleUpdateOpen(data: State['update']): void
  handleUpdateClose(): void
}

export const useAdminStore = create<State & Action>((set) => ({
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
