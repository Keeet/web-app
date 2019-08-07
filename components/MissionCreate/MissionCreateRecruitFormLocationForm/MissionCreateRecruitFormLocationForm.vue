<template>
  <div class="mission-create-recruit-form-location-form">
    <OverlayModal
      :title="$t('missionCreate.recruit.generalForm.locationForm.title', $store.state.locale)"
      :loading="s.pending"
      @close="$store.commit('missionFormRecruit/closeLocationForm')"
    >
      <Input
        :title="$t('missionCreate.recruit.generalForm.locationForm.companyLabel', $store.state.locale)"
        :placeholder="$t('missionCreate.recruit.generalForm.locationForm.companyPlaceholder', $store.state.locale)"
        :value="s.name"
        mutation="locationForm/setName"
        :error="nameError"
        :disable-error="!showErrors"
      />
      <div class="mission-create-recruit-form-location-form-street">
        <div class="mission-create-recruit-form-location-form-street-name">
          <Input
            :title="$t('missionCreate.recruit.generalForm.locationForm.streetLabel', $store.state.locale)"
            :placeholder="$t('missionCreate.recruit.generalForm.locationForm.streetPlaceholder', $store.state.locale)"
            :value="s.street"
            mutation="locationForm/setStreet"
            :error="streetError"
            :disable-error="!showErrors"
          />
        </div>
        <div class="mission-create-recruit-form-location-form-street-nb">
          <Input
            :title="$t('missionCreate.recruit.generalForm.locationForm.houseNumberLabel', $store.state.locale)"
            :placeholder="$t('missionCreate.recruit.generalForm.locationForm.houseNumberPlaceholder', $store.state.locale)"
            :value="s.houseNumber"
            mutation="locationForm/setHouseNumber"
            :error="houseNumberError"
            :disable-error="!showErrors"
          />
        </div>
      </div>
      <Input
        :title="$t('missionCreate.recruit.generalForm.locationForm.additionalLabel', $store.state.locale)"
        :placeholder="$t('missionCreate.recruit.generalForm.locationForm.additionalPlaceholder', $store.state.locale)"
        :value="s.addressDescription"
        mutation="locationForm/setAddressDescription"
        :error="null"
      />
      <div class="mission-create-recruit-form-location-form-city">
        <div class="mission-create-recruit-form-location-form-city-name">
          <Input
            :title="$t('missionCreate.recruit.generalForm.locationForm.cityLabel', $store.state.locale)"
            :placeholder="$t('missionCreate.recruit.generalForm.locationForm.cityPlaceholder', $store.state.locale)"
            :value="s.city"
            mutation="locationForm/setCity"
            :error="cityError"
            :disable-error="!showErrors"
          />
        </div>
        <div class="mission-create-recruit-form-location-form-city-zip">
          <Input
            :title="$t('missionCreate.recruit.generalForm.locationForm.zipLabel', $store.state.locale)"
            :placeholder="$t('missionCreate.recruit.generalForm.locationForm.zipPlaceholder', $store.state.locale)"
            :value="s.zipCode"
            mutation="locationForm/setZipCode"
            :error="zipCodeError"
            :disable-error="!showErrors"
          />
        </div>
      </div>
      <Select
        :title="$t('missionCreate.recruit.generalForm.locationForm.countryLabel', $store.state.locale)"
        :options="countryOptions"
        :value="s.country"
        mutation="locationForm/setCountry"
      />
      <ButtonText
        :text="$t('missionCreate.recruit.generalForm.locationForm.submitButton', $store.state.locale)"
        :disabled="!formValid"
        @click="submitForm"
        @disabledClick="showErrors = true"
      />
    </OverlayModal>
  </div>
</template>

<script>
import { COUNTRIES_TESTING_TIME, COUNTRY_LABELS } from '../../constants'
import OverlayModal from '../../_shared/OverlayModal/OverlayModal'
import ButtonText from '../../_shared/ButtonText/ButtonText'
import Select from '../../_shared/Select/Select'
import Input from '../../_shared/Input/Input'
export default {
  name: 'MissionCreateRecruitFormLocationForm',
  components: { Input, Select, ButtonText, OverlayModal },
  data() {
    return {
      showErrors: false,
      COUNTRY_LABELS
    }
  },
  computed: {
    s() {
      return this.$store.state.locationForm
    },
    countryOptions() {
      return COUNTRIES_TESTING_TIME.map(country => ({
        label: COUNTRY_LABELS[country],
        value: country
      }))
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
      this.$store.dispatch('locationForm/submitCompanyLocation').then((newLocation) => {
        const { id } = newLocation
        const newCompanyLocation = this.$store.getters.getCompanyLocationById(id)
        this.$store.commit('missionFormRecruit/closeLocationForm')
        this.$emit('submitted', newCompanyLocation)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitFormLocationForm";
</style>
