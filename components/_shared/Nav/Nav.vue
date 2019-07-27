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
          Dashboard
        </p>
      </nuxt-link>
      <Staging />
    </div>
    <div class="nav-right">
      <a class="request-feature" href="https://keeet.nolt.io" target="_blank">
        Request feature
      </a>
      <nuxt-link to="/account">
        <div class="nav-profile">
          <div class="nav-profile-img">
            <img :src="$store.state.user.profileImage">
          </div>
          <p class="nav-profile-welcome">
            Hello, {{ $store.state.user.firstName }}!
          </p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Logo from '../Logo/Logo'
import Staging from '../Staging/Staging'

export default {
  name: 'Nav',
  components: { Staging, Logo },
  computed: {
    path() {
      return this.$route.path
    }
  }
}
</script>

<style scoped lang="scss">
  @import "Nav";
</style>
