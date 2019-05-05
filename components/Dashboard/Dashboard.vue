<template>
  <div class="dashboard">
    <OverlayModal v-if="!$store.state.user.companyId" title="Last Step" no-close>
      <CompanyForm @submit="companySubmitted" :loading="loading" />
    </OverlayModal>
  </div>
</template>

<script>
import OverlayModal from '../_shared/OverlayModal/OverlayModal'
import CompanyForm from '../_shared/CompanyForm/CompanyForm'
export default {
  name: 'Dashboard',
  components: { CompanyForm, OverlayModal },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    companySubmitted() {
      this.loading = true
      this.$auth.renewTokens().then(() => {
        this.$fetch(['USER'], true)
      }).catch(() => {
        this.$router.push(`/auth/login?redirectUrl=${encodeURI('/')}`)
      })
    }
  },
  beforeMount() {
    this.$store.commit('companyForm/init')
  }
}
</script>

<style scoped lang="scss">
  @import "Dashboard";
</style>
