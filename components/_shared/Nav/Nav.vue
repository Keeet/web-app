<template>
  <div class="nav">
    <div class="nav-text">
      <div class="nav-logo">
        <nuxt-link to="/">
          Keeet
        </nuxt-link>
      </div>
      <p class="nav-item" :class="{active: path === '/'}">
        <nuxt-link to="/">
          Dashboard
        </nuxt-link>
      </p>
      <p class="nav-item" :class="{active: path === '/personas'}">
        <nuxt-link to="/personas">
          Personas
        </nuxt-link>
      </p>
    </div>
    <div class="nav-profile">
      <div class="nav-profile-img">
        <img :src="$store.state.auth0User.picture">
      </div>
      <p class="nav-profile-welcome">
        Hello, {{ $store.state.user.firstName }}!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
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
