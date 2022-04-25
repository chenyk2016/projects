<template>
  <div>
    keep-alive 的二层组件
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'alive',
  activated() {
    console.log('activated');
  },
  deactivated() {
    console.log('deactivated');
  },
}
</script>

<style>

</style>
