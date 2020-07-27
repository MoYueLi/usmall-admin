import { reqSpecsList, reqSpecsTotal } from '@/utils/request'

const state = {
  list: [],
  total: 0,
  page: 1,
  size: 3
}

const mutations = {
  setSpecsList (state, arr) {
    arr.forEach(i => {
      i.attrs = JSON.parse(i.attrs)
    })
    state.list = arr
  },
  setSpecsTotal (state, sum) {
    state.total = sum
  },
  setSpecsPage (state, page) {
    state.page = page
  }
}

const actions = {
  // 请求商品规格数据 (分页方式)
  reqSpecsList (context, bool) {
    let params
    if (bool) {
      params = {}
    } else {
      params = {
        size: context.state.size,
        page: context.state.page
      }
    }

    reqSpecsList(params).then(res => {
      // 如果删除最后一页的最后一个，自动去请求前面一页的
      if (res.data.list && !res.data.list.length && context.state.page > 1) {
        context.commit('setSpecsPage', context.state.page - 1)
        context.dispath('reqSpecsList')
        return
      }
      context.commit('setSpecsList', res.data.list)
    })
  },
  reqSpecsTotal (context) {
    reqSpecsTotal().then(res => {
      context.commit('setSpecsTotal', res.data.list[0].total)
    })
  },
  reqCurPage (context, page) {
    context.commit('setSpecsPage', page)
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
