<template>
  <div class="mission-create-recruit-form-location">
    <MissionCreateRecruitFormLocationItem
      :location="companyLocation"
      :active="s.locationId === 'COMPANY'"
      @click.native="setCompanyLocation"
    />
    <MissionCreateRecruitFormLocationItem
      v-for="(location, x) in company.locations"
      :key="x"
      :location="location"
      :active="location.id === s.locationId"
      @click.native="setLocation(location)"
    />
    <MissionCreateRecruitFormLocationItem create @click.native="openLocationForm" />
    <MissionCreateRecruitFormLocationForm v-if="s.locationFormOpened" />
  </div>
</template>

<script>
import MissionCreateRecruitFormLocationItem from '../MissionCreateRecruitFormLocationItem/MissionCreateRecruitFormLocationItem'
import MissionCreateRecruitFormLocationForm from '../MissionCreateRecruitFormLocationForm/MissionCreateRecruitFormLocationForm'
export default {
  name: 'MissionCreateRecruitFormLocation',
  components: { MissionCreateRecruitFormLocationForm, MissionCreateRecruitFormLocationItem },
  computed: {
    s() {
      return this.$store.state.missionForm
    },
    company() {
      return this.$store.state.company
    },
    companyLocation() {
      const { name, street, houseNumber, addressDescription, zipCode, city, country } = this.company
      return { name, street, houseNumber, addressDescription, zipCode, city, country }
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
  @import "MissionCreateRecruitFormLocation";
</style>
