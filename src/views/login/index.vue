<template>
  <div class="login">
    <div class="con">
      <h3>登录</h3>
      <el-col :span="13">
        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      </el-col>
      <el-col :span="13">
        <el-input placeholder="请输入密码" v-model="user.password" show-password></el-input>
      </el-col>
      <div class="btn-box">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { reqUserLogin } from '@/utils/request'
import { successAlert, warningAlert } from '@/utils/alert'
import { mapActions } from 'vuex'

export default {
  components: {},
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      changeUser: 'setUser'
    }),
    empty () {
      this.user = {
        username: '',
        password: ''
      }
    },
    login () {
      reqUserLogin(this.user).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg)
          this.changeUser(res.data.list)
          this.$router.push('/home')
          this.empty()
        } else {
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
  .login {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right, #553444, #303d60);
  }

  .con {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 400px;
    padding: 20px;
    background: #fff;
    border-radius: 20px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  h3 {
    line-height: 60px;
    font-size: 30px;
    text-align: center;
  }

  .input {
    margin-bottom: 20px;
  }

  .btn-box {
    text-align: center;
  }
  .el-button{
    width: 100px;
    margin-top: 20px;
  }
  .el-input{
    margin-top: 20px;
  }
</style>
