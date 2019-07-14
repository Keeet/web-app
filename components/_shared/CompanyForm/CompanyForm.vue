<template>
  <div class="company-form">
    <Input
      title="Company name*"
      placeholder="Keeet"
      :value="s.name"
      mutation="companyForm/setName"
      :error="nameError"
      :disable-error="!showErrors"
    />
    <div class="company-form-street">
      <div class="company-form-street-name">
        <Input
          title="Street*"
          placeholder="Rosenthaler Strasse"
          :value="s.street"
          mutation="companyForm/setStreet"
          :error="streetError"
          :disable-error="!showErrors"
        />
      </div>
      <div class="company-form-street-nb">
        <Input
          title="Number*"
          placeholder="101"
          :value="s.houseNumber"
          mutation="companyForm/setHouseNumber"
          :error="houseNumberError"
          :disable-error="!showErrors"
        />
      </div>
    </div>
    <Input
      title="Additional"
      placeholder="third backyard"
      :value="s.addressDescription"
      mutation="companyForm/setAddressDescription"
      :error="null"
    />
    <div class="company-form-city">
      <div class="company-form-city-name">
        <Input
          title="City*"
          placeholder="Berlin"
          :value="s.city"
          mutation="companyForm/setCity"
          :error="cityError"
          :disable-error="!showErrors"
        />
      </div>
      <div class="company-form-city-zip">
        <Input
          title="ZIP*"
          placeholder="10369"
          :value="s.zipCode"
          mutation="companyForm/setZipCode"
          :error="zipCodeError"
          :disable-error="!showErrors"
        />
      </div>
    </div>
    <Select
      title="Country*"
      :options="[{
        label: COUNTRY_NAMES['DE'],
        value: 'DE'
      }]"
      :value="s.country"
      mutation="companyForm/setCountry"
      readonly
    />
    <ButtonText
      :text="edit ? 'Save changes' : 'Go'"
      :disabled="!formValid"
      @click="submitForm"
      @disabledClick="showErrors = true"
    />
  </div>
</template>

<script>
import { COUNTRY_LABELS } from '../../constants'
import Input from '../Input/Input'
import ButtonText from '../ButtonText/ButtonText'
import Select from '../Select/Select'
export default {
  name: 'CompanyForm',
  components: { Select, ButtonText, Input },
  props: {
    id: {
      type: String,
      default: null
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showErrors: false,
      COUNTRY_NAMES: COUNTRY_LABELS
    }
  },
  computed: {
    s() {
      return this.$store.state.companyForm
    },
    onCreate() {
      return !this.s.id
    },
    nameError() { return this.s.name !== '' ? null : 'required' },
    streetError() { return this.s.street !== '' ? null : 'required' },
    houseNumberError() { return this.s.houseNumber !== '' ? null : 'required' },
    zipCodeError() { return this.s.zipCode.match(/^[0-9]+$/) ? null : 'must be a number' },
    cityError() { return this.s.city !== '' ? null : 'required' },
    countryError() { return this.s.country !== '' ? null : 'required' },
    formValid() {
      return (
        !this.nameError &&
        !this.streetError &&
        !this.houseNumberError &&
        !this.cityError &&
        !this.zipCodeError &&
        !this.countryError
      )
    }
  },
  methods: {
    submitForm() {
      this.$store.commit('companyForm/pending')
      this.$push.upsertCompany(this.s).then(() => {
        this.$store.commit('companyForm/submitted')
        this.$emit('submit')
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "CompanyForm";
</style>
