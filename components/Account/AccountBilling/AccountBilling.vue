<template>
  <div class="account-billing">
    <div v-if="!$hasRole('ADMIN')" class="account-billing-no-admin">
      {{ $t('account.billing.noAdmin', $store.state.locale) }}
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
