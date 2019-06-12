const defaultState = {
  title: 'Hey there!',
  message: 'You have been invited to participate in a short test. Ready?',
  brandImgId: null,
  color: '#0FBCF9'
}

export const state = () => (defaultState)

export const mutations = {
  setTitle(state, title) {
    state.title = title
  }
}
