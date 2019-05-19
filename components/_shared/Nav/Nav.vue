<template>
  <div class="nav">
    <div class="nav-text">
      <div class="nav-logo">
        <nuxt-link to="/">
          Keeet
        </nuxt-link>
      </div>
      <nuxt-link to="/">
        <p class="nav-item" :class="{active: path === '/'}">
          Dashboard
        </p>
      </nuxt-link>
      <nuxt-link to="/personas">
        <p class="nav-item" :class="{active: path === '/personas'}">
          Personas
        </p>
      </nuxt-link>
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
