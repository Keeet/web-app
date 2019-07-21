<template>
  <div class="mission-create-recruit-form-location-form">
    <OverlayModal
      title="Add new location"
      :loading="s.pending"
      @close="$store.commit('missionFormRecruit/closeLocationForm')"
    >
      <Input
        title="Name*"
        placeholder="Keeet"
        :value="s.name"
        mutation="locationForm/setName"
        :error="nameError"
        :disable-error="!showErrors"
      />
      <div class="mission-create-recruit-form-location-form-street">
        <div class="mission-create-recruit-form-location-form-street-name">
          <Input
            title="Street*"
            placeholder="Rosenthaler Str."
            :value="s.street"
            mutation="locationForm/setStreet"
            :error="streetError"
            :disable-error="!showErrors"
          />
        </div>
        <div class="mission-create-recruit-form-location-form-street-nb">
          <Input
            title="Number*"
            placeholder="101"
            :value="s.houseNumber"
            mutation="locationForm/setHouseNumber"
            :error="houseNumberError"
            :disable-error="!showErrors"
          />
        </div>
      </div>
      <Input
        title="Additional"
        placeholder="third backyard"
        :value="s.addressDescription"
        mutation="locationForm/setAddressDescription"
        :error="null"
      />
      <div class="mission-create-recruit-form-location-form-city">
        <div class="mission-create-recruit-form-location-form-city-name">
          <Input
            title="City*"
            placeholder="Berlin"
            :value="s.city"
            mutation="locationForm/setCity"
            :error="cityError"
            :disable-error="!showErrors"
          />
        </div>
        <div class="mission-create-recruit-form-location-form-city-zip">
          <Input
            title="ZIP*"
            placeholder="10369"
            :value="s.zipCode"
            mutation="locationForm/setZipCode"
            :error="zipCodeError"
            :disable-error="!showErrors"
          />
        </div>
      </div>
      <Select
        title="Country*"
        :options="[{
          label: COUNTRY_LABELS['DE'],
          value: 'DE'
        }]"
        :value="s.country"
        mutation="locationForm/setCountry"
        readonly
      />
      <ButtonText text="Add" :disabled="!formValid" @click="submitForm" @disabledClick="showErrors = true" />
    </OverlayModal>
  </div>
</template>

<script>
import { COUNTRY_LABELS } from '../../constants'
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
        this.$store.commit('missionFormRecruit/setLocation', newCompanyLocation)
        this.$store.commit('missionFormRecruit/closeLocationForm')
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitFormLocationForm";
</style>
