<template>
  <div class="dashboard-container">
    <div class="dashboard-text">昵称: {{ nickname }}</div>
    <div class="dashboard-text">欢迎来到舞巷舞蹈工作室管理系统1.0</div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      nickname: sessionStorage.getItem('nickname')
    }
  }
  // computed: {
  //   ...mapGetters([
  //     'nickname'
  //   ])
  // }
}
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
