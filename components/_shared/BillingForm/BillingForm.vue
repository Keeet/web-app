<template>
  <div class="billing-form">
    <div class="billing-form-inner" :class="{ pending: s.pending }">
      <Input
        :title="$t('account.billing.form.companyLabel', $store.state.locale)"
        :value="company.name"
        readonly
      />
      <Input
        :title="$t('account.billing.form.emailLabel', $store.state.locale)"
        :placeholder="$t('account.billing.form.emailPlaceholder', $store.state.locale)"
        :value="s.email"
        mutation="billingForm/setEmail"
        :error="$store.getters['billingForm/emailError']"
        :disable-error="!showErrors"
        dispatch-error="billingForm/handleValidationError"
      />
      <Input
        :title="$t('account.billing.form.vatLabel', $store.state.locale)"
        :value="s.vatTaxId"
        mutation="billingForm/setVatTaxId"
      />
      <div class="billing-form-rows">
        <div class="billing-form-rows-item">
          <Input
            :title="$t('account.billing.form.streetLabel', $store.state.locale)"
            :placeholder="$t('account.billing.form.streetPlaceholder', $store.state.locale)"
            :value="s.street"
            mutation="billingForm/setStreet"
            :error="$store.getters['billingForm/streetError']"
            :disable-error="!showErrors"
            dispatch-error="billingForm/handleValidationError"
          />
        </div>
        <div class="billing-form-rows-item">
          <Input
            :title="$t('account.billing.form.houseNumberLabel', $store.state.locale)"
            :placeholder="$t('account.billing.form.houseNumberPlaceholder', $store.state.locale)"
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
            :title="$t('account.billing.form.cityLabel', $store.state.locale)"
            :placeholder="$t('account.billing.form.cityPlaceholder', $store.state.locale)"
            :value="s.city"
            mutation="billingForm/setCity"
            :error="$store.getters['billingForm/cityError']"
            :disable-error="!showErrors"
            dispatch-error="billingForm/handleValidationError"
          />
        </div>
        <div class="billing-form-rows-item">
          <Input
            :title="$t('account.billing.form.zipLabel', $store.state.locale)"
            :placeholder="$t('account.billing.form.zipPlaceholder', $store.state.locale)"
            :value="s.zipCode"
            mutation="billingForm/setZipCode"
            :error="$store.getters['billingForm/zipCodeError']"
            :disable-error="!showErrors"
            dispatch-error="billingForm/handleValidationError"
          />
        </div>
      </div>
      <Select
        :title="$t('account.billing.form.countryLabel', $store.state.locale)"
        :options="countryOptions"
        :value="s.country"
        mutation="billingForm/setCountry"
      />
      <div class="billing-form-submit">
        <ButtonText
          :text="$t('account.billing.form.submit', $store.state.locale)"
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
      if (this.hasChangedSinceInit) {
        this.showErrors = true
        scrollToTopId(this.s.invalidFields.map(field => field.id))
      }
    },
    submit() {
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
