<template>
  <div :id="id" class="mission-create-recruit-form-location">
    <MissionCreateRecruitFormLocationItem
      v-for="(location, x) in company.locations"
      :key="x"
      :location="location"
      :active="selectedLocation && location.id === selectedLocation.id"
      @click.native="setLocation(location)"
    />
    <MissionCreateRecruitFormLocationItem
      :error="s.showErrors ? locationError : null"
      create
      @click.native="openLocationForm"
    />
    <MissionCreateRecruitFormLocationForm v-if="s.recruit.locationFormOpened" />
  </div>
</template>

<script>
import uuid from 'uuid'
import MissionCreateRecruitFormLocationItem from '../MissionCreateRecruitFormLocationItem/MissionCreateRecruitFormLocationItem'
import MissionCreateRecruitFormLocationForm from '../MissionCreateRecruitFormLocationForm/MissionCreateRecruitFormLocationForm'
export default {
  name: 'MissionCreateRecruitFormLocation',
  components: { MissionCreateRecruitFormLocationForm, MissionCreateRecruitFormLocationItem },
  data() {
    return { id: null }
  },
  computed: {
    s() {
      const { missionForm, missionFormRecruit } = this.$store.state
      return {
        ...missionForm,
        recruit: missionFormRecruit
      }
    },
    company() {
      return this.$store.state.company
    },
    selectedLocation() {
      return this.s.recruit.location
    },
    locationError() {
      return this.selectedLocation ? null : 'required'
    }
  },
  watch: {
    locationError(e) {
      this.errorHandler(e)
    }
  },
  mounted() {
    this.id = uuid.v4()
    this.errorHandler(this.locationError)
  },
  methods: {
    setLocation(location) {
      this.$store.commit('missionFormRecruit/setLocation', location)
    },
    openLocationForm() {
      this.$store.commit('locationForm/init', { company: this.company })
      this.$store.commit('missionFormRecruit/openLocationForm')
    },
    errorHandler(error = null) {
      this.$store.dispatch('missionForm/handleValidationError', {
        id: this.id,
        error
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitFormLocation";
</style>
