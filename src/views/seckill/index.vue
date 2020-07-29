<template>
  <div>
    <el-button class="elBtn" @click="add" type="primary">添加</el-button>
    <!--添加弹窗-->
    <sk-add ref="add" :info="info"/>
    <!--秒杀活动list-->
    <sk-list @edit="edit"/>
  </div>
</template>

<script>
import SkAdd from './components/skAdd'
import SkList from './components/skList'

export default {
  name: 'SecKill',
  components: { SkList, SkAdd },
  data () {
    return {
      info: {
        show: false,
        title: '活动添加',
        isAdd: true
      }
    }
  },
  methods: {
    add () {
      this.info.show = true
      this.info.title = '活动添加'
      this.info.isAdd = true
    },
    edit (id) {
      this.info.show = true
      this.info.title = '活动修改'
      this.info.isAdd = false
      this.$refs.add.getDetail(id)
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
