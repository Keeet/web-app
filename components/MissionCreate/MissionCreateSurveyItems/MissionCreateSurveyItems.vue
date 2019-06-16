<template>
  <div class="mission-create-survey-items">
    <MissionCreateSurveyItem
      v-for="(item, x) in items"
      :key="x"
      :type="item.type"
      :index="x"
    >
      <MissionCreateSurveyItemSelectQuestion
        v-if="[SINGLE_SELECT, MULTI_SELECT].includes(item.type)"
        :index="x"
      />
      <MissionCreateSurveyItemLinearScaleQuestion
        v-else-if="[LINEAR_SCALE].includes(item.type)"
        :index="x"
      />
      <MissionCreateSurveyItemLikertQuestion
        v-else-if="[LIKERT].includes(item.type)"
        :index="x"
      />
    </MissionCreateSurveyItem>
  </div>
</template>

<script>
import { MISSION_SURVEY_ITEMS } from '../../constants'
import MissionCreateSurveyItemSelectQuestion
  from '../MissionCreateSurveyItemSelectQuestion/MissionCreateSurveyItemSelectQuestion'
import MissionCreateSurveyItemLinearScaleQuestion
  from '../MissionCreateSurveyItemLinearScaleQuestion/MissionCreateSurveyItemLinearScaleQuestion'
import MissionCreateSurveyItem from '../MissionCreateSurveyItem/MissionCreateSurveyItem'
import MissionCreateSurveyItemLikertQuestion
  from '../MissionCreateSurveyItemLikertQuestion/MissionCreateSurveyItemLikertQuestion'

export default {
  name: 'MissionCreateSurveyItems',
  components: { MissionCreateSurveyItemLikertQuestion, MissionCreateSurveyItem, MissionCreateSurveyItemLinearScaleQuestion, MissionCreateSurveyItemSelectQuestion },
  data() {
    const { SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LINEAR_SCALE, LIKERT } = MISSION_SURVEY_ITEMS
    return { SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LINEAR_SCALE, LIKERT }
  },
  computed: {
    items() {
      return this.$store.state.missionFormSurvey.items
    }
  }
}
</script>
