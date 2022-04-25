<template>
  <div class="">test1</div>
</template>

<script>
export default {
  name: 'test1',
  render(h) {
    console.log('test1 render');
  },
  activated() {
    console.log('test1 activated');
  },
  deactivated() {
    console.log('test1 deactivated');
  },
}
</script>
