<template>
  <div class="mission-create-form-location-form">
    <OverlayModal
      title="Add new location"
      :loading="s.pending"
      @close="$store.commit('missionForm/closeLocationForm')"
    >
      <Input
        title="Name*"
        placeholder="Keeet"
        :value="s.name"
        mutation="locationForm/setName"
        :error="nameError"
        :disable-error="!showErrors"
      />
      <div class="mission-create-form-location-form-street">
        <div class="mission-create-form-location-form-street-name">
          <Input
            title="Street*"
            placeholder="Rosenthaler Strasse"
            :value="s.street"
            mutation="locationForm/setStreet"
            :error="streetError"
            :disable-error="!showErrors"
          />
        </div>
        <div class="mission-create-form-location-form-street-nb">
          <Input
            title="Number*"
            placeholder="101"
            :value="s.houseNb"
            mutation="locationForm/setHouseNb"
            :error="houseNbError"
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
      <div class="mission-create-form-location-form-city">
        <div class="mission-create-form-location-form-city-name">
          <Input
            title="City*"
            placeholder="Berlin"
            :value="s.city"
            mutation="locationForm/setCity"
            :error="cityError"
            :disable-error="!showErrors"
          />
        </div>
        <div class="mission-create-form-location-form-city-zip">
          <Input
            title="ZIP*"
            placeholder="10369"
            :value="s.zip"
            mutation="locationForm/setZip"
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
        :value="s.country"
        mutation="locationForm/setCountry"
        readonly
      />
      <ButtonText text="Add" :disabled="!formValid" @click="submitForm" @disabledClick="showErrors = true" />
    </OverlayModal>
  </div>
</template>

<script>
import { COUNTRY_NAMES } from '../../constants'
import OverlayModal from '../../_shared/OverlayModal/OverlayModal'
import ButtonText from '../../_shared/ButtonText/ButtonText'
import Select from '../../_shared/Select/Select'
import Input from '../../_shared/Input/Input'
export default {
  name: 'MissionCreateFormLocationForm',
  components: { Input, Select, ButtonText, OverlayModal },
  data() {
    return {
      showErrors: false,
      COUNTRY_NAMES
    }
  },
  computed: {
    s() {
      return this.$store.state.locationForm
    },
    nameError() { return this.s.name !== '' ? null : 'required' },
    streetError() { return this.s.street !== '' ? null : 'required' },
    houseNbError() { return this.s.houseNb !== '' ? null : 'required' },
    zipError() { return this.s.zip.match(/^[0-9]+$/) ? null : 'must be a number' },
    cityError() { return this.s.city !== '' ? null : 'required' },
    countryError() { return this.s.country !== '' ? null : 'required' },
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
      // TODO: implement API
      // CREATE
      // this.$axios.post('/company/{id}/location', this.store).then(() => {
      //   this.$emit('submit')
      // })
      const newLocationId = '609eeb55-e429-41f4-b0b9-2477ddc7f929'
      this.$store.commit('locationForm/pending')
      window.setTimeout(() => {
        this.$fetch([{ name: 'COMPANY', forced: true, mockDataKey: 'mockDataWithLocation' }]).then(() => {
          const newLocation = this.$store.state.company.locations.filter(l => l.id === newLocationId)[0]
          this.$store.commit('missionForm/setLocation', newLocation)
          this.$store.commit('locationForm/submitted')
          this.$store.commit('missionForm/closeLocationForm')
        })
      }, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateFormLocationForm";
</style>
