<template>
  <div class="company-form">
    <Input
      title="Company name*"
      placeholder="Keeet"
      :value="store.name"
      mutation="companyForm/setName"
      :error="nameError"
      :disable-error="!showErrors"
    />
    <div class="company-form-street">
      <div class="company-form-street-name">
        <Input
          title="Street*"
          placeholder="Rosenthaler Strasse"
          :value="store.street"
          mutation="companyForm/setStreet"
          :error="streetError"
          :disable-error="!showErrors"
        />
      </div>
      <div class="company-form-street-nb">
        <Input
          title="Number*"
          placeholder="101"
          :value="store.houseNb"
          mutation="companyForm/setHouseNb"
          :error="houseNbError"
          :disable-error="!showErrors"
        />
      </div>
    </div>
    <Input
      title="Additional"
      placeholder="third backyard"
      :value="store.addressDescription"
      mutation="companyForm/setAddressDescription"
      :error="null"
    />
    <div class="company-form-city">
      <div class="company-form-city-name">
        <Input
          title="City*"
          placeholder="Berlin"
          :value="store.city"
          mutation="companyForm/setCity"
          :error="cityError"
          :disable-error="!showErrors"
        />
      </div>
      <div class="company-form-city-zip">
        <Input
          title="ZIP*"
          placeholder="10369"
          :value="store.zip"
          mutation="companyForm/setZip"
          :error="zipError"
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
      :value="store.country"
      mutation="companyForm/setCountry"
      readonly
    />
    <ButtonText text="Go" :disabled="!formValid" @click="submitForm" @disabledClick="showErrors = true" />
  </div>
</template>

<script>
import { COUNTRY_NAMES } from '../../constants'
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
    }
  },
  data() {
    return {
      showErrors: false,
      COUNTRY_NAMES
    }
  },
  computed: {
    store() {
      return this.$store.state.companyForm
    },
    nameError() { return this.store.name !== '' ? null : 'required' },
    streetError() { return this.store.street !== '' ? null : 'required' },
    houseNbError() { return this.store.houseNb !== '' ? null : 'required' },
    zipError() { return this.store.zip.match(/^[0-9]+$/) ? null : 'must be a number' },
    cityError() { return this.store.city !== '' ? null : 'required' },
    countryError() { return this.store.country !== '' ? null : 'required' },
    formValid() {
      return (
        !this.nameError &&
        !this.streetError &&
        !this.houseNbError &&
        !this.cityError &&
        !this.zipError &&
        !this.countryError
      )
    }
  },
  methods: {
    submitForm() {
      if (this.id === null) {
        // TODO: implement API
        // CREATE
        // this.$axios.post('/company', this.store).then(() => {
        //   this.$emit('submit')
        // })
      } else {
        // UPDATE
      }
      this.$emit('submit')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "CompanyForm";
</style>
