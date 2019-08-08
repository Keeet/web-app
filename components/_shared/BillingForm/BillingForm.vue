<template>
  <div class="billing-form">
    <div class="billing-form-inner" :class="{ pending: s.pending }">
      <BillingFormAddress />
      <div class="billing-form-payment">
        <BillingFormCreditCard />
        <div class="billing-form-payment-bank-transfer">
          <input id="billing-form-payment-bank-transfer-input" v-model="bankTransferCheckbox" type="checkbox" :value="true">
          <label for="billing-form-payment-bank-transfer-input">
            {{ $t('shared.billingForm.useBankTransfer', $store.state.locale) }}
          </label>
        </div>
      </div>
      <div class="billing-form-submit">
        <ButtonText
          :text="$t('shared.billingForm.submit', $store.state.locale)"
          :disabled="submitButtonDisabled"
          no-margin
          @disabledClick="disabledSubmit"
          @click="submit"
        />
      </div>
    </div>
    <div v-show="s.pending" class="billing-form-pending">
      <div class="billing-form-pending-loading">
        <Loading />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonText from '../ButtonText/ButtonText'
import { scrollToTopId } from '../../../utils/scrollUtils'
import Loading from '../Loading/Loading'
import BillingFormCreditCard from '../BillingFormCreditCard/BillingFormCreditCard'
import BillingFormAddress from '../BillingFormAddress/BillingFormAddress'

export default {
  name: 'BillingForm',
  components: { BillingFormAddress, BillingFormCreditCard, Loading, ButtonText },
  computed: {
    s() {
      return this.$store.state.billingForm
    },
    company() {
      return this.$store.state.company
    },
    hasChangedSinceInit() {
      return this.$store.getters['billingForm/hasChanged']
    },
    submitButtonDisabled() {
      return (
        this.s.invalidFields.length > 0 ||
        !this.hasChangedSinceInit
      )
    },
    bankTransferCheckbox: {
      get() {
        return this.s.bankTransferCheckbox
      },
      set(value) {
        this.$store.commit('billingForm/setBankTransferCheckbox', value)
      }
    }
  },
  methods: {
    disabledSubmit() {
      this.$mpAppHelper.trackBilling('attemptSubmitInvalidForm')
      if (this.hasChangedSinceInit) {
        this.$store.commit('billingForm/showErrors')
        scrollToTopId(this.s.invalidFields.map(field => field.id))
      }
    },
    submit() {
      this.$mpAppHelper.trackBilling('submit')
      this.$store.dispatch('billingForm/submit').then(() => {
        this.$store.commit('billingForm/init', this.company.billingConfig)
        this.$emit('submitted')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "BillingForm";
</style>
