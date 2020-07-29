import { reqGoodsCount, reqGoodsList } from '../../utils/request'

const state = {
  list: [],
  size: 3,
  page: 1,
  total: 0
}

const mutations = {
  changeList (state, arr) {
    state.list = arr
  },
  changePage (state, page) {
    state.page = page
  },
  changeTotal (state, sum) {
    state.total = sum
  }
}
const actions = {
  setGoodsList (context, data) {
    let params
    if (!data) {
      params = {
        size: context.state.size,
        page: context.state.page
      }
    } else {
      params = data
    }
    reqGoodsList(params).then(res => {
      if (res.data.code === 200) {
        context.commit('changeList', res.data.list)
      }
    })
  },
  setGoodsTotal (context) {
    reqGoodsCount().then(res => {
      if (res.data.code === 200) {
        context.commit('changeTotal', res.data.list[0].total)
      }
    })
  },
  setPage (context, page) {
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
