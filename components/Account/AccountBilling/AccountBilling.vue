<template>
  <div class="account-billing">
    <Input
      title="Company Name*"
      placeholder="Keeet"
      :value="$store.state.company.name"
      :error="firstNameError"
      :disable-error="!showErrors"
      readonly
    />
  </div>
</template>

<script>
import Input from '../../_shared/Input/Input'
export default {
  name: 'AccountBilling',
  components: { Input },
  data() {
    return { showErrors: false }
  },
  computed: {
    s() {
      return this.$store.state.accountBillingForm
    },
    companyError() { return this.s.firstName !== '' ? null : 'required' },
    lastNameError() { return this.s.lastName !== '' ? null : 'required' }
  }
}
</script>

<style lang="scss" scoped>
  @import "AccountBilling";
</style>
