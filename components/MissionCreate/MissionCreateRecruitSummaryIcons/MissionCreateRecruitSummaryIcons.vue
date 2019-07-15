<template>
  <div class="mission-create-recruit-summary-icons">
    <MissionCreateRecruitSummaryIconsItem
      type="LOCATION"
    >
      <p>{{ location.name }}</p>
      <p>{{ location.street }} {{ location.houseNumber }}</p>
      <p v-if="location.addressDescription">
        {{ location.addressDescription }}
      </p>
      <p>{{ location.zipCode }} {{ location.city }}</p>
      <p>{{ COUNTRY_LABELS[location.country] }}</p>
    </MissionCreateRecruitSummaryIconsItem>
    <MissionCreateRecruitSummaryIconsItem
      type="DURATION"
      :text="`${s.recruit.duration} min`"
    />
    <MissionCreateRecruitSummaryIconsItem
      type="PARTICIPANTS"
      :text="`${parseInt(s.participants)} test users`"
    />
  </div>
</template>

<script>
import { COUNTRY_LABELS, LANGUAGE_LABELS } from '../../constants'
import MissionCreateRecruitSummaryIconsItem from '../MissionCreateRecruitSummaryIconsItem/MissionCreateRecruitSummaryIconsItem'
export default {
  name: 'MissionCreateRecruitSummaryIcons',
  components: { MissionCreateRecruitSummaryIconsItem },
  data() {
    return {
      LANGUAGE_LABELS,
      COUNTRY_LABELS
    }
  },
  computed: {
    s() {
      const { missionForm, missionFormRecruit } = this.$store.state
      return {
        ...missionForm,
        recruit: missionFormRecruit
      }
    },
    location() {
      return this.s.recruit.location
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitSummaryIcons";
</style>
