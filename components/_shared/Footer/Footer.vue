<template>
  <div class="footer">
    <div class="footer-logo">
      <a href="https://keeet.io" target="_blank">
        {{ $t('shared.footer.landingPageLink', $store.state.locale) }}
      </a>
    </div>
    <p class="footer-nav-item">
      <a href="https://keeet.io/legal/imprint.html" target="_blank">
        {{ $t('shared.footer.imprintLink', $store.state.locale) }}
      </a>
    </p>
    <p class="footer-nav-item">
      <a href="https://keeet.io/legal/terms.html" target="_blank">
        {{ $t('shared.footer.termsLink', $store.state.locale) }}
      </a>
    </p>
    <p class="footer-nav-item">
      <a href="https://keeet.io/legal/terms.html" target="_blank">
        {{ $t('shared.footer.privacyLink', $store.state.locale) }}
      </a>
    </p>
    <p class="footer-nav-item" @click="$auth.logOut()">
      {{ $t('shared.footer.logoutLink', $store.state.locale) }}
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
