<template>
  <div>
    keep-alive 的二层组件
    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive> -->
    <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
    </router-view>
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
