<template>
  <div>
    <el-container class="mainView">
      <!--      <el-scrollbar wrap-class="scrollbar-wrapper">-->
      <el-aside class="aside" width="150px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          router
          :unique-opened="true"
          active-text-color="#ffd04b">
          <el-menu-item index="/home">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>首页</span>
            </template>
          </el-menu-item>
          <el-submenu v-if="user.menus[index].children" :index="item.id+''" :key="index" v-for="(item, index) in user.menus">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item v-for="child in item.children" :key="child.id" :index="child.url">{{child.title}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-if="!user.menus[index].children" v-for="(child, index) in user.menus" :key="index"
                        :index="child.url">{{child.title}}
          </el-menu-item>
        </el-menu>

      </el-aside>
      <!--      </el-scrollbar>-->
      <el-container>
        <el-header>
          <div class="header-con">
            <span>{{user.username}}</span>
            <el-button type="primary" @click="exit">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view class="view"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'index',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      user: 'admin'
    })
  },
  methods: {
    ...mapActions({
      changeUser: 'setUser'
    }),
    exit () {
      this.changeUser(null)
      this.$router.push('/login')
    },
    hasChildren (i) {
      return this.user.menus[i].children
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
  .aside {
    background: #545c64;
    height: 100vh;
    overflow: hidden;
  }

  .el-col {
    width: 100%;
    height: 100%;
  }

  .el-header {
    background: #b3c0d1;
    overflow: hidden;
  }

  .view {
    padding-top: 20px;
  }

  .mainView {
    height: 100vh;
  }

  .header-con {
    float: right;
  }

  .header-con span {
    line-height: 60px;
    color: #ffffff;
  }

</style>
