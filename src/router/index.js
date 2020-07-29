import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router)

function hasPower (url) {
  return store.state.admin.menus_url.some(i => i === url)
}

let router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('../views/login/index')
    },
    {
      path: '/',
      component: () => import('../views/index/index'),
      children: [
        {
          path: 'banner',
          component: () => import('../views/banner/index'),
          name: '轮播设置',
          beforeEnter (to, from, next) {
            hasPower('/banner') ? next() : next('/home')
          }
        },
        {
          path: 'cate',
          component: () => import('../views/cate/index'),
          name: '商品分类',
          beforeEnter (to, from, next) {
            hasPower('/cate') ? next() : next('/home')
          }
        },
        {
          path: 'goods',
          component: () => import('../views/goods/index'),
          name: '商品管理',
          beforeEnter (to, from, next) {
            hasPower('/goods') ? next() : next('/home')
          }
        },
        {
          path: 'home',
          component: () => import('../views/home/index'),
          name: '主页'
        },
        {
          path: 'manage',
          component: () => import('../views/manage/index'),
          name: '管理员管理',
          beforeEnter (to, from, next) {
            hasPower('/manage') ? next() : next('/home')
          }
        },
        {
          path: 'member',
          component: () => import('../views/member/index'),
          name: '会员管理',
          beforeEnter (to, from, next) {
            hasPower('/member') ? next() : next('/home')
          }
        },
        {
          path: 'menu',
          component: () => import('../views/menu/index'),
          name: '菜单管理',
          beforeEnter (to, from, next) {
            hasPower('/menu') ? next() : next('/home')
          }
        },
        {
          path: 'role',
          component: () => import('../views/role/index'),
          name: '角色管理',
          beforeEnter (to, from, next) {
            hasPower('/role') ? next() : next('/home')
          }
        },
        {
          path: 'seckill',
          component: () => import('../views/seckill/index'),
          name: '秒杀活动',
          beforeEnter (to, from, next) {
            hasPower('/seckill') ? next() : next('/home')
          }
        },
        {
          path: 'spec',
          component: () => import('../views/spec/index'),
          name: '商品规格',
          beforeEnter (to, from, next) {
            hasPower('/spec') ? next() : next('/home')
          }
        },
        {
          path: '',
          redirect: 'home'
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 去登录页面就放过去
  if (to.path === '/login') {
    next()
    return
  }
  // 不是登录页面就看有没有用户信息
  if (store.state.admin) {
    next()
    return
  }
  next('/login')
})

export default router
