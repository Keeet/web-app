<template>
  <div class="auth-callback">
    <div v-if="notVerified" class="not-verified">
      <p class="not-verified-title">
        Please verify your email
      </p>
      <p class="not-verified-description">
        We sent a verification mail to your email address. Please check your inbox and click on the verification link to start using Keeet.
      </p>
      <ButtonText text="Back to login" @click="$auth.logOut()" />
    </div>
  </div>
</template>

<script>
import ButtonText from '../_shared/ButtonText/ButtonText'
export default {
  name: 'AuthCallback',
  components: { ButtonText },
  data() {
    return {
      notVerified: false
    }
  },
  mounted() {
    this.$ga.page(this.$router)
    this.$auth.handleAuthentication().then(() => {
      const { redirectUrl } = this.$route.query
      if (redirectUrl) {
        this.$router.push(decodeURI(redirectUrl))
      } else {
        this.$router.push('/')
      }
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err)
      const { error, errorDescription } = err
      if (error === 'unauthorized' && errorDescription === 'NOT_VERIFIED') {
        this.notVerified = true
        return
      }
      this.$auth.logOut()
    })
  }
}
</script>

<style scoped lang="scss">
  @import "AuthCallback";
</style>
