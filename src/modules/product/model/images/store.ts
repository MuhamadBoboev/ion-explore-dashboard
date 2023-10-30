import { create } from 'zustand'
import { IProductImage } from '@modules/product/model/images/IProductImage'

type State = {
  open: boolean
  update: IProductImage | null
}

type Action = {
  handleCreateOpen(): void
  handleCreateClose(): void
  handleUpdateOpen(data: State['update']): void
  handleUpdateClose(): void
}

export const useProductImageStore = create<State & Action>((set) => ({
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
