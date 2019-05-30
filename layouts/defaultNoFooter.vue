<template>
  <div class="default">
    <Nav />
    <div class="content">
      <nuxt />
    </div>
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
  .content {
    padding: 120px 0;
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
