import axios from 'axios'
import Qs from 'qs'

axios.interceptors.response.use(res => {
  console.group('请求数据' + res.config.url)
  console.log(res)
  console.groupEnd()
  return res
})

// 请求头
const baseUrl = '/api'

// 获取菜单列表
export const reqMenuList = (params) => {
  return axios({
    url: baseUrl + '/api/menulist',
    method: 'get',
    params
  })
}

// 获取表单单个数据
export const reqMenuDetail = (params) => {
  return axios({
    url: baseUrl + '/api/menuinfo',
    method: 'get',
    params
  })
}

// 添加菜单列表
export const reqMenuAdd = (data) => {
  return axios({
    url: baseUrl + '/api/menuadd',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 修改菜单数据
export const reqMenuUpdate = (data) => {
  return axios({
    url: baseUrl + '/api/menuedit',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 删除单条菜单数据
export const reqMenuDel = (data) => {
  return axios({
    url: baseUrl + '/api/menudelete',
    method: 'post',
    data
  })
}

// --------------------角色

// 1.获取角色列表
export const reqRoleList = () => {
  return axios({
    url: baseUrl + '/api/rolelist',
    method: 'get'
  })
}

// 2.添加角色
export const reqRoleAdd = (data) => {
  return axios({
    url: baseUrl + '/api/roleadd',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 3.获取一条角色数据
export const reqRoleInfo = (params) => {
  return axios({
    url: baseUrl + '/api/roleinfo',
    method: 'get',
    params
  })
}

// 4.修改角色
export const reqRoleEdit = (data) => {
  return axios({
    url: baseUrl + '/api/roleedit',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 5.删除角色
export const reqRoleDelete = (data) => {
  return axios({
    url: baseUrl + '/api/roledelete',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// ---------------管理员管理
// 1.管理员添加
export const reqUserAdd = (data) => axios({
  url: baseUrl + '/api/useradd',
  method: 'post',
  data: Qs.stringify(data)
})

// 2.管理员总数(用于计算分页)
export const reqUserCount = () => axios({
  url: baseUrl + '/api/usercount',
  method: 'get'
})

// 3.管理员列表(分页方式请求)
export const reqUserList = (params) => axios({
  url: baseUrl + '/api/userlist',
  method: 'get',
  params
})

// 4.获取管理员信息一条
export const reqUserDetail = (params) => axios({
  url: baseUrl + '/api/userinfo',
  method: 'get',
  params
})

// 5.修改管理员信息
export const reqUserUpdate = (data) => axios({
  url: baseUrl + '/api/useredit',
  method: 'post',
  data: Qs.stringify(data)
})

// 6.删除管理员 uid用户编号
export const reqUserDelete = (data) => axios({
  url: baseUrl + '/api/userdelete',
  method: 'post',
  data: Qs.stringify(data)
})

// 7.管理员登录
export const reqUserLogin = (data) => axios({
  url: baseUrl + '/api/userlogin',
  method: 'post',
  data: Qs.stringify(data)
})

// ---------商品规格
// 1.添加商品规格
export const reqSpecsAdd = (data) => axios({
  url: baseUrl + '/api/specsadd',
  method: 'post',
  data: Qs.stringify(data)
})

// 2.商品规格总数
export const reqSpecsTotal = () => axios({
  url: baseUrl + '/api/specscount',
  method: 'get'
})

// 3.商品规格列表(分页)
export const reqSpecsList = (params) => axios({
  url: baseUrl + '/api/specslist',
  method: 'get',
  params
})

// 4.获取一条商品规格
export const reqSpecsDetail = (params) => axios({
  url: baseUrl + '/api/specsinfo',
  method: 'get',
  params
})

// 5.修改商品规格
export const reqSpecsEdit = (data) => axios({
  url: baseUrl + '/api/specsedit',
  method: 'post',
  data: Qs.stringify(data)
})

// 6.删除商品规格
export const reqSpecsDelete = (data) => axios({
  url: baseUrl + '/api/specsdelete',
  method: 'post',
  data: Qs.stringify(data)
})

// -----------会员管理
// 获取会员列表
export const reqMemberList = () => axios({
  url: baseUrl + '/api/memberlist',
  method: 'get'
})

// 获取单条会员数据
export const reqMemberInfo = (params) => axios({
  url: baseUrl + '/api/memberinfo',
  method: 'get',
  params
})

// 修改会员信息
export const reqMemberEdit = (data) => axios({
  url: baseUrl + '/api/memberedit',
  method: 'post',
  data: Qs.stringify(data)
})

// ---------商品分类
// 添加商品分类
export const reqCateAdd = (data) => {
  let formData = new FormData()
  for (let i in data) {
    formData.append(i, data[i])
  }
  return axios({
    url: baseUrl + '/api/cateadd',
    method: 'post',
    data: formData
  })
}

// 商品分类列表
export const reqCateList = (params) => axios({
  url: baseUrl + '/api/catelist',
  method: 'get',
  params
})

// 商品分类获取（一条）
export const reqCateDetail = (params) => axios({
  url: baseUrl + '/api/cateinfo',
  method: 'get',
  params
})

// 商品分类修改
export const reqCateEdit = (data) => {
  let formData = new FormData()
  for (let i in data) {
    formData.append(i, data[i])
  }
  axios({
    url: baseUrl + '/api/cateedit',
    method: 'post',
    data: formData
  })
}

// 商品分类删除
export const reqCateDelete = (data) => axios({
  url: baseUrl + '/api/catedelete',
  method: 'post',
  data: Qs.stringify(data)
})

// -----------banner图管理
// banner图添加
export const reqBannerAdd = (data) => {
  let formData = new FormData()
  for (let i in data) {
    formData.append(i, data[i])
  }
  return axios({
    url: baseUrl + '/api/banneradd',
    method: 'post',
    data: formData
  })
}

// banner图列表
export const reqBannerList = () => axios({
  url: baseUrl + '/api/bannerlist',
  method: 'get'
})

// 获取一条banner图数据
export const reqBannerDetail = (params) => axios({
  url: baseUrl + '/api/bannerinfo',
  method: 'get',
  params
})

// 修改轮播图
export const reqBannerEdit = (data) => {
  let formData = new FormData()
  for (let i in data) {
    formData.append(i, data[i])
  }
  return axios({
    url: baseUrl + '/api/banneredit',
    method: 'post',
    data: formData
  })
}

// 删除轮播图
export const reqBannerDelete = (data) => axios({
  url: baseUrl + '/api/bannerdelete',
  method: 'post',
  data: Qs.stringify(data)
})

// ------------商品管理
// 添加商品
export const reqGoodsAdd = (data) => {
  let formData = new FormData()
  for (let i in data) {
    formData.append(i, data[i])
  }
  return axios({
    url: baseUrl + '/api/goodsadd',
    method: 'post',
    data: formData
  })
}

// 获取商品总数
export const reqGoodsCount = () => axios({
  url: baseUrl + '/api/goodscount',
  method: 'get'
})

// 获取商品列表
export const reqGoodsList = (params) => axios({
  url: baseUrl + '/api/goodslist',
  method: 'get',
  params
})

// 获取一条商品信息
export const reqGoodsDetail = (params) => axios({
  url: baseUrl + '/api/goodsinfo',
  method: 'get',
  params
})

// 修改商品
export const reqGoodsEdit = (data) => {
  let formData = new FormData()
  for (let i in data) {
    formData.append(i, data[i])
  }
  return axios({
    url: baseUrl + '/api/goodsedit',
    method: 'post',
    data: formData
  })
}

// 删除商品
export const reqGoodsDelete = (data) => axios({
  url: baseUrl + '/api/goodsdelete',
  method: 'post',
  data: Qs.stringify(data)
})
