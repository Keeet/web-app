<template>
  <div class="mission-create-survey-items">
    <div
      v-for="(item, x) in items"
      :key="x"
      class="mission-create-survey-items-item"
    >
      <MissionCreateSurveyItemTextQuestion
        v-if="[SHORT_TEXT, LONG_TEXT].includes(item.type)"
        :index="x"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import { MISSION_SURVEY_ITEMS } from '../../constants'
import MissionCreateSurveyItemTextQuestion
  from '../MissionCreateSurveyItemTextQuestion/MissionCreateSurveyItemTextQuestion'

export default {
  name: 'MissionCreateSurveyItems',
  components: { MissionCreateSurveyItemTextQuestion },
  data() {
    const { SHORT_TEXT, LONG_TEXT } = MISSION_SURVEY_ITEMS
    return { SHORT_TEXT, LONG_TEXT }
  },
  computed: {
    items() {
      return this.$store.state.missionFormSurvey.items
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyItems";
</style>
