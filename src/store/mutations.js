export const state = {
  admin: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
}

export const mutations = {
  changeUser (state, list) {
    state.admin = list
    sessionStorage.setItem('user', JSON.stringify(state.admin))
  }
}

export const getters = {
  admin: (state) => state.admin
}
