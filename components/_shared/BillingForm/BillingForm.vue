<template>
  <div class="billing-form">
    <div class="billing-form-inner" :class="{ pending: s.pending }">
      <Input
        :title="$t('shared.billingForm.companyLabel', $store.state.locale)"
        :value="company.name"
        readonly
      />
      <Input
        :title="$t('shared.billingForm.emailLabel', $store.state.locale)"
        :placeholder="$t('shared.billingForm.emailPlaceholder', $store.state.locale)"
        :value="s.email"
        mutation="billingForm/setEmail"
        :error="$store.getters['billingForm/emailError']"
        :disable-error="!showErrors"
        dispatch-error="billingForm/handleValidationError"
      />
      <Input
        :title="$t('shared.billingForm.vatLabel', $store.state.locale)"
        :value="s.vatTaxId"
        mutation="billingForm/setVatTaxId"
      />
      <div class="billing-form-rows">
        <div class="billing-form-rows-item">
          <Input
            :title="$t('shared.billingForm.streetLabel', $store.state.locale)"
            :placeholder="$t('shared.billingForm.streetPlaceholder', $store.state.locale)"
            :value="s.street"
            mutation="billingForm/setStreet"
            :error="$store.getters['billingForm/streetError']"
            :disable-error="!showErrors"
            dispatch-error="billingForm/handleValidationError"
          />
        </div>
        <div class="billing-form-rows-item">
          <Input
            :title="$t('shared.billingForm.houseNumberLabel', $store.state.locale)"
            :placeholder="$t('shared.billingForm.houseNumberPlaceholder', $store.state.locale)"
            :value="s.houseNumber"
            mutation="billingForm/setHouseNumber"
            :error="$store.getters['billingForm/houseNumberError']"
            :disable-error="!showErrors"
            dispatch-error="billingForm/handleValidationError"
          />
        </div>
      </div>
      <div class="billing-form-rows">
        <div class="billing-form-rows-item">
          <Input
            :title="$t('shared.billingForm.cityLabel', $store.state.locale)"
            :placeholder="$t('shared.billingForm.cityPlaceholder', $store.state.locale)"
            :value="s.city"
            mutation="billingForm/setCity"
            :error="$store.getters['billingForm/cityError']"
            :disable-error="!showErrors"
            dispatch-error="billingForm/handleValidationError"
          />
        </div>
        <div class="billing-form-rows-item">
          <Input
            :title="$t('shared.billingForm.zipLabel', $store.state.locale)"
            :placeholder="$t('shared.billingForm.zipPlaceholder', $store.state.locale)"
            :value="s.zipCode"
            mutation="billingForm/setZipCode"
            :error="$store.getters['billingForm/zipCodeError']"
            :disable-error="!showErrors"
            dispatch-error="billingForm/handleValidationError"
          />
        </div>
      </div>
      <Select
        :title="$t('shared.billingForm.countryLabel', $store.state.locale)"
        :options="countryOptions"
        :value="s.country"
        mutation="billingForm/setCountry"
      />
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
import { COUNTRIES, COUNTRY_LABELS } from '../../constants'
import Input from '../Input/Input'
import Select from '../Select/Select'
import ButtonText from '../ButtonText/ButtonText'
import { scrollToTopId } from '../../../utils/scrollUtils'
import Loading from '../Loading/Loading'

export default {
  name: 'BillingForm',
  components: { Loading, ButtonText, Select, Input },
  data() {
    return { showErrors: false }
  },
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
    hasChangedSinceInit() {
      return this.$store.getters['billingForm/hasChanged']
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
      this.$mpAppHelper.trackBilling('attemptSubmitInvalidForm')
      if (this.hasChangedSinceInit) {
        this.showErrors = true
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
