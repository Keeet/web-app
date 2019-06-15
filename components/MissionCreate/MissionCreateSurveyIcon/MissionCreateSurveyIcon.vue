<template>
  <IconMissionSurveyShortText v-if="type === SHORT_TEXT" />
  <IconMissionSurveyLongText v-else-if="type === LONG_TEXT" />
  <IconMissionSurveySingleSelect v-else-if="type === SINGLE_SELECT" />
  <IconMissionSurveyMultiSelect v-else-if="type === MULTI_SELECT" />
  <IconMissionSurveyLikert v-else-if="type === LIKERT" />
  <IconMissionSurveyLinearScale v-else-if="type === LINEAR_SCALE" />
</template>

<script>
import { MISSION_SURVEY_ITEMS, MISSION_SURVEY_USABILITY_HUB_ITEMS } from '../../constants'

export default {
  name: 'MissionCreateSurveyIcon',
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.values({ ...MISSION_SURVEY_ITEMS, ...MISSION_SURVEY_USABILITY_HUB_ITEMS }).includes(value)
    }
  },
  data() {
    const { SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LIKERT, LINEAR_SCALE } = MISSION_SURVEY_ITEMS
    return { SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LIKERT, LINEAR_SCALE }
  }
}
</script>
