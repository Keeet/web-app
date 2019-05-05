<template>
  <div class="default">
    <div class="content">
      <Nav />
      <nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import Nav from '../components/_shared/Nav/Nav'
import Footer from '../components/_shared/Footer/Footer'
export default {
  components: { Footer, Nav }
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
    padding-top: 100px;
  }
</style>
