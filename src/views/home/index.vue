<template>
  <div>
    <div id="main" style="width: 1000px;height:400px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'Home',
  data () {
    return {
      option: {
        title: {
          text: '近一周订单数量'
        },
        tooltip: {},
        legend: {
          data: ['订单']
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {},
        series: [{
          name: '订单',
          type: 'line',
          data: [300, 350, 120, 500, 400, 700, 800]
        }]
      }
    }
  },
  methods: {},
  mounted () {
    let myEcharts = echarts.init(document.getElementById('main'))
    myEcharts.setOption(this.option)
  }
}
</script>

<style scoped>

</style>
