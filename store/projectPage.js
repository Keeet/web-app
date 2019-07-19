export const state = () => ({
  deleteConfirmOpened: false
})

export const mutations = {
  openDeleteConfirm(state) {
    state.deleteConfirmOpened = true
  },
  closeDeleteConfirm(state) {
    state.deleteConfirmOpened = false
  }
}
