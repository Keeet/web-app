export const state = () => ({
  testUserId: '',
  testUserIdPending: false
})

export const mutations = {
  setTestUserId(state, testUserId) {
    state.testUserId = testUserId
  },
  testUserIdPending(state) {
    state.testUserIdPending = true
  },
  testUserIdSubmitted(state) {
    state.testUserIdPending = false
  }
}

export const actions = {
  submitTestUserId({ state, commit }) {
    commit('testUserIdPending')
    this.$push.setTestCompany(state.testUserId).then(() => {
      commit('testUserIdSubmitted')
      commit('setTestUserId', '')
    })
  }
}
