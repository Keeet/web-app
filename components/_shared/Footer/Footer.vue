<template>
  <div class="footer">
    <div class="footer-logo">
      <a href="https://keeet.io" target="_blank">Keeet</a>
    </div>
    <p class="footer-nav-item">
      <a href="https://keeet.io/legal/imprint.html" target="_blank">Imprint</a>
    </p>
    <p class="footer-nav-item">
      <a href="https://keeet.io/legal/terms.html" target="_blank">Terms of Service</a>
    </p>
    <p class="footer-nav-item">
      <a href="https://keeet.io/legal/terms.html" target="_blank">Privacy Policy</a>
    </p>
    <p class="footer-nav-item" @click="$auth.logOut()">
      Logout
    </p>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang="scss">
  @import "Footer";
</style>
