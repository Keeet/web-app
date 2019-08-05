<template>
  <div class="nav">
    <div class="nav-text">
      <nuxt-link to="/">
        <div class="nav-logo">
          <Logo />
        </div>
      </nuxt-link>
      <nuxt-link to="/">
        <p class="nav-item" :class="{active: path === '/'}">
          {{ $t('shared.nav.dashboardLink', $store.state.locale) }}
        </p>
      </nuxt-link>
      <Staging />
      <nuxt-link v-if="showInternal" to="/internal/companies">
        <p class="nav-item nav-item-internal" :class="{active: path === '/internal/companies'}">
          {{ $t('shared.nav.internalLink', $store.state.locale) }}
        </p>
      </nuxt-link>
    </div>
    <div class="nav-right">
      <a class="request-feature" href="https://keeet.nolt.io" target="_blank">
        {{ $t('shared.nav.requestFeatureLink', $store.state.locale) }}
      </a>
      <nuxt-link to="/account">
        <div class="nav-profile">
          <div class="nav-profile-img">
            <ThumborImage
              :src="$store.state.user.profileImage"
              :width="90"
              :height="90"
            />
          </div>
          <p class="nav-profile-welcome">
            {{ $t('shared.nav.welcome', $store.state.locale, { name: $store.state.user.firstName }) }}
          </p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Logo from '../Logo/Logo'
import Staging from '../Staging/Staging'
import ThumborImage from '../ThumborImage/ThumborImage'

export default {
  name: 'Nav',
  components: { ThumborImage, Staging, Logo },
  computed: {
    path() {
      return this.$route.path
    },
    showInternal() {
      return this.$auth.hasScope('super:admin')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "Nav";
</style>
