import { reqUserList, reqUserCount } from '@/utils/request'

const state = {
  list: [],
  total: 0,
  page: 1,
  size: 2
}

const mutations = {
  changeList (state, arr) {
    state.list = arr
  },
  setUserTotal (state, sum) {
    state.total = sum
  },
  changePage (state, page) {
    state.page = page
  }
}

const actions = {
  // 请求管理员列表 需要一页的数量和第几页
  reqUserList (context) {
    const params = {
      size: context.state.size,
      page: context.state.page
    }
    reqUserList(params).then(res => {
      if (!res.data.list && context.state.page > 1) {
        context.commit('changePage', context.state.page - 1)
        context.dispatch('reqUserList')
        return
      }
      context.commit('changeList', res.data.list)
    })
  },
  // 请求管理员总数
  reqUserTotal (context) {
    reqUserCount().then(res => {
      context.commit('setUserTotal', res.data.list[0].total)
    })
  },
  // 修改当前页数
  changePage (context, page) {
    context.commit('changePage', page)
  }
}

const getters = {
  list: (state) => state.list,
  size: (state) => state.size,
  total: (state) => state.total
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
