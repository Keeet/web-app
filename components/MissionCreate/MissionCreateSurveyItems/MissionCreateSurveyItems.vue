<template>
  <div class="mission-create-survey-items">
    <MissionCreateSurveyItem
      v-for="(item, x) in items"
      :key="x"
      :type="item.type"
      :index="x"
    >
      <MissionCreateSurveyItemTextQuestion
        v-if="[SHORT_TEXT, LONG_TEXT].includes(item.type)"
        :index="x"
      />
      <MissionCreateSurveyItemSelectQuestion
        v-else-if="[SINGLE_SELECT, MULTI_SELECT].includes(item.type)"
        :index="x"
      />
      <MissionCreateSurveyItemLinearScaleQuestion
        v-else-if="[LINEAR_SCALE].includes(item.type)"
        :index="x"
      />
    </MissionCreateSurveyItem>
  </div>
</template>

<script>
import { MISSION_SURVEY_ITEMS } from '../../constants'
import MissionCreateSurveyItemTextQuestion
  from '../MissionCreateSurveyItemTextQuestion/MissionCreateSurveyItemTextQuestion'
import MissionCreateSurveyItemSelectQuestion
  from '../MissionCreateSurveyItemSelectQuestion/MissionCreateSurveyItemSelectQuestion'
import MissionCreateSurveyItemLinearScaleQuestion
  from '../MissionCreateSurveyItemLinearScaleQuestion/MissionCreateSurveyItemLinearScaleQuestion'
import MissionCreateSurveyItem from '../MissionCreateSurveyItem/MissionCreateSurveyItem'

export default {
  name: 'MissionCreateSurveyItems',
  components: { MissionCreateSurveyItem, MissionCreateSurveyItemLinearScaleQuestion, MissionCreateSurveyItemSelectQuestion, MissionCreateSurveyItemTextQuestion },
  data() {
    const { SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LINEAR_SCALE } = MISSION_SURVEY_ITEMS
    return { SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LINEAR_SCALE }
  },
  computed: {
    items() {
      return this.$store.state.missionFormSurvey.items
    }
  }
}
</script>
