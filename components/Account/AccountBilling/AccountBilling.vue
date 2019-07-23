<template>
  <div class="account-billing">
    <div v-if="!$hasRole('ADMIN')" class="account-billing-no-admin">
      Please contact the admin to edit the billing address.
    </div>
    <BillingForm v-else />
  </div>
</template>

<script>
import BillingForm from '../../_shared/BillingForm/BillingForm'

export default {
  name: 'AccountBilling',
  components: { BillingForm }
}
</script>

<style lang="scss" scoped>
  @import "AccountBilling";
</style>
