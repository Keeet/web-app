<template>
  <div class="billing-form-credit-card" :class="{ inactive }">
    <div v-if="inactive" class="billing-form-credit-card-overlay" />
    <p v-if="error && !inactive" class="billing-form-credit-card-error">
      {{ error }}
    </p>
    <div ref="card" />
  </div>
</template>

<script>
export default {
  name: 'BillingFormCreditCard',
  data() {
    return {
      stripeError: null
    }
  },
  computed: {
    billingForm() {
      return this.$store.state.billingForm
    },
    inactive() {
      return this.billingForm.bankTransferCheckbox
    },
    error() {
      const { creditCardError } = this.billingForm
      if (!creditCardError) {
        return null
      }
      switch (creditCardError.code) {
        case 'invalid_number':
          return this.$t('shared.billingForm.stripe.errors.invalidNumber', this.$store.state.locale)
        case 'invalid_expiry_month':
          return this.$t('shared.billingForm.stripe.errors.invalidExpiryMonth', this.$store.state.locale)
        case 'invalid_expiry_year':
          return this.$t('shared.billingForm.stripe.errors.invalidExpiryYear', this.$store.state.locale)
        case 'invalid_expiry_year_past':
          return this.$t('shared.billingForm.stripe.errors.invalidExpiryYearPast', this.$store.state.locale)
        case 'incomplete_expiry':
          return this.$t('shared.billingForm.stripe.errors.incompleteExpiry', this.$store.state.locale)
        case 'invalid_cvc':
          return this.$t('shared.billingForm.stripe.errors.invalidExpiryCvc', this.$store.state.locale)
        default:
          return creditCardError.message
      }
    }
  },
  mounted() {
    this.$loadStripe.then(() => {
      // eslint-disable-next-line no-undef
      const stripe = Stripe('pk_test_y1O9Lxq9IophNu9O1B0htwCj00ESyEVm2P')
      const elements = stripe.elements()
      const card = elements.create('card')

      card.mount(this.$refs.card)

      card.addEventListener('change', (event) => {
        if (!event.error) {
          this.stripeError = null
        } else {
          this.stripeError = event.error
        }
      })
    })
  }
}
</script>

<style lang="scss">
  @import "BillingFormCreditCard";
</style>
