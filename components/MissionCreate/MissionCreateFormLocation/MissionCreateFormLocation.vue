<template>
  <div class="mission-create-form-location">
    <MissionCreateFormLocationItem
      :location="companyLocation"
      :active="s.locationId === 'COMPANY'"
      @click.native="setCompanyLocation"
    />
    <MissionCreateFormLocationItem
      v-for="(location, x) in company.locations"
      :key="x"
      :location="location"
      :active="location.id === s.locationId"
      @click.native="setLocation(location)"
    />
    <MissionCreateFormLocationItem create @click.native="openLocationForm" />
    <MissionCreateFormLocationForm v-if="s.locationFormOpened" />
  </div>
</template>

<script>
import MissionCreateFormLocationItem from '../MissionCreateFormLocationItem/MissionCreateFormLocationItem'
import MissionCreateFormLocationForm from '../MissionCreateFormLocationForm/MissionCreateFormLocationForm'
export default {
  name: 'MissionCreateFormLocation',
  components: { MissionCreateFormLocationForm, MissionCreateFormLocationItem },
  computed: {
    s() {
      return this.$store.state.missionForm
    },
    company() {
      return this.$store.state.company
    },
    companyLocation() {
      const { name, street, houseNb, addressDescription, zip, city, country } = this.company
      return { name, street, houseNb, addressDescription, zip, city, country }
    }
  },
  methods: {
    setCompanyLocation() {
      this.$store.commit('missionForm/setLocation', this.companyLocation)
    },
    setLocation(location) {
      this.$store.commit('missionForm/setLocation', location)
    },
    openLocationForm() {
      this.$store.commit('locationForm/init')
      this.$store.commit('missionForm/openLocationForm')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateFormLocation";
</style>
