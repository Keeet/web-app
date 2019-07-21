<template>
  <div class="account-billing">
    <div class="account-billing-form" :class="{ pending: s.pending }">
      <Input
        title="Company Name"
        :value="$store.state.company.name"
        readonly
      />
      <Input
        title="Email*"
        placeholder="billing@keeet.io"
        :value="s.email"
        mutation="accountBillingForm/setEmail"
        :error="$store.getters['accountBillingForm/emailError']"
        :disable-error="!showErrors"
        dispatch-error="accountBillingForm/handleValidationError"
      />
      <Input
        title="VAT number / tax ID"
        :value="s.vatTaxId"
        mutation="accountBillingForm/setVatTaxId"
      />
      <div class="account-billing-form-rows">
        <div class="account-billing-form-rows-item">
          <Input
            title="Street*"
            placeholder="Rosenthaler Str."
            :value="s.street"
            mutation="accountBillingForm/setStreet"
            :error="$store.getters['accountBillingForm/streetError']"
            :disable-error="!showErrors"
            dispatch-error="accountBillingForm/handleValidationError"
          />
        </div>
        <div class="account-billing-form-rows-item">
          <Input
            title="Number*"
            placeholder="101"
            :value="s.houseNumber"
            mutation="accountBillingForm/setHouseNumber"
            :error="$store.getters['accountBillingForm/houseNumberError']"
            :disable-error="!showErrors"
            dispatch-error="accountBillingForm/handleValidationError"
          />
        </div>
      </div>
      <div class="account-billing-form-rows">
        <div class="account-billing-form-rows-item">
          <Input
            title="City*"
            placeholder="Berlin"
            :value="s.city"
            mutation="accountBillingForm/setCity"
            :error="$store.getters['accountBillingForm/cityError']"
            :disable-error="!showErrors"
            dispatch-error="accountBillingForm/handleValidationError"
          />
        </div>
        <div class="account-billing-form-rows-item">
          <Input
            title="ZIP*"
            placeholder="10369"
            :value="s.zipCode"
            mutation="accountBillingForm/setZipCode"
            :error="$store.getters['accountBillingForm/zipCodeError']"
            :disable-error="!showErrors"
            dispatch-error="accountBillingForm/handleValidationError"
          />
        </div>
      </div>
      <Select
        title="Country*"
        :options="countryOptions"
        :value="s.country"
        mutation="accountBillingForm/setCountry"
      />
      <div class="account-billing-submit">
        <ButtonText
          text="Submit"
          :disabled="submitButtonDisabled"
          no-margin
          @disabledClick="disabledSubmit"
          @click="$store.dispatch('accountBillingForm/submit')"
        />
      </div>
    </div>
    <div v-show="s.pending" class="account-billing-pending">
      <div class="account-billing-pending-loading">
        <Loading />
      </div>
    </div>
  </div>
</template>

<script>
import { COUNTRIES, COUNTRY_LABELS } from '../../constants'
import Input from '../../_shared/Input/Input'
import ButtonText from '../../_shared/ButtonText/ButtonText'
import { scrollToTopId } from '../../../utils/scrollUtils'
import Select from '../../_shared/Select/Select'
import Loading from '../../_shared/Loading/Loading'

export default {
  name: 'AccountBilling',
  components: { Loading, Select, ButtonText, Input },
  data() {
    return { showErrors: false }
  },
  computed: {
    s() {
      return this.$store.state.accountBillingForm
    },
    countryOptions() {
      return Object.keys(COUNTRIES).map(country => ({
        value: country,
        label: COUNTRY_LABELS[country]
      }))
    },
    hasChangedSinceInit() {
      return this.$store.getters['accountBillingForm/hasChanged']
    },
    submitButtonDisabled() {
      return (
        this.s.invalidFields.length > 0 ||
        !this.hasChangedSinceInit
      )
    }
  },
  methods: {
    disabledSubmit() {
      if (this.hasChangedSinceInit) {
        this.showErrors = true
        scrollToTopId(this.s.invalidFields.map(field => field.id))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "AccountBilling";
</style>
