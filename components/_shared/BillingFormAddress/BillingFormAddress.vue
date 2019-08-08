<template>
  <div class="billing-form-address">
    <Input
      :title="$t('shared.billingForm.address.companyLabel', $store.state.locale)"
      :value="company.name"
      readonly
    />
    <Input
      :title="$t('shared.billingForm.address.emailLabel', $store.state.locale)"
      :placeholder="$t('shared.billingForm.address.emailPlaceholder', $store.state.locale)"
      :value="s.email"
      mutation="billingForm/setEmail"
      :error="$store.getters['billingForm/emailError']"
      :disable-error="!showErrors"
      dispatch-error="billingForm/handleValidationError"
    />
    <Input
      :title="$t('shared.billingForm.address.vatLabel', $store.state.locale)"
      :value="s.vatTaxId"
      mutation="billingForm/setVatTaxId"
    />
    <div class="billing-form-address-rows">
      <div class="billing-form-address-rows-item">
        <Input
          :title="$t('shared.billingForm.address.streetLabel', $store.state.locale)"
          :placeholder="$t('shared.billingForm.address.streetPlaceholder', $store.state.locale)"
          :value="s.street"
          mutation="billingForm/setStreet"
          :error="$store.getters['billingForm/streetError']"
          :disable-error="!showErrors"
          dispatch-error="billingForm/handleValidationError"
        />
      </div>
      <div class="billing-form-address-rows-item">
        <Input
          :title="$t('shared.billingForm.address.houseNumberLabel', $store.state.locale)"
          :placeholder="$t('shared.billingForm.address.houseNumberPlaceholder', $store.state.locale)"
          :value="s.houseNumber"
          mutation="billingForm/setHouseNumber"
          :error="$store.getters['billingForm/houseNumberError']"
          :disable-error="!showErrors"
          dispatch-error="billingForm/handleValidationError"
        />
      </div>
    </div>
    <div class="billing-form-address-rows">
      <div class="billing-form-address-rows-item">
        <Input
          :title="$t('shared.billingForm.address.cityLabel', $store.state.locale)"
          :placeholder="$t('shared.billingForm.address.cityPlaceholder', $store.state.locale)"
          :value="s.city"
          mutation="billingForm/setCity"
          :error="$store.getters['billingForm/cityError']"
          :disable-error="!showErrors"
          dispatch-error="billingForm/handleValidationError"
        />
      </div>
      <div class="billing-form-address-rows-item">
        <Input
          :title="$t('shared.billingForm.address.zipLabel', $store.state.locale)"
          :placeholder="$t('shared.billingForm.address.zipPlaceholder', $store.state.locale)"
          :value="s.zipCode"
          mutation="billingForm/setZipCode"
          :error="$store.getters['billingForm/zipCodeError']"
          :disable-error="!showErrors"
          dispatch-error="billingForm/handleValidationError"
        />
      </div>
    </div>
    <Select
      :title="$t('shared.billingForm.address.countryLabel', $store.state.locale)"
      :options="countryOptions"
      :value="s.country"
      mutation="billingForm/setCountry"
    />
  </div>
</template>

<script>
import Input from '../Input/Input'
import Select from '../Select/Select'
import { COUNTRIES, COUNTRY_LABELS } from '../../constants'
export default {
  name: 'BillingFormAddress',
  components: { Select, Input },
  computed: {
    s() {
      return this.$store.state.billingForm
    },
    company() {
      return this.$store.state.company
    },
    countryOptions() {
      return Object.keys(COUNTRIES).map(country => ({
        value: country,
        label: COUNTRY_LABELS[country]
      }))
    },
    showErrors() {
      return this.s.showErrors
    }
  }
}
</script>

<style scoped lang="scss">
  @import "BillingFormAddress";
</style>
