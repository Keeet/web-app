<template>
  <div class="default">
    <Nav />
    <nuxt />
  </div>
</template>

<script>
import Nav from '../components/_shared/Nav/Nav'
export default {
  components: { Nav }
}
</script>

<style scoped lang="scss">
  .default {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
