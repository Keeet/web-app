<template>
  <div class="mission-create-survey-add-box-item" :class="type">
    <div class="mission-create-survey-add-box-item-icon">
      <IconMissionSurveyShortText v-if="type === SHORT_TEXT" />
      <IconMissionSurveyLongText v-if="type === LONG_TEXT" />
      <IconMissionSurveySingleSelect v-if="type === SINGLE_SELECT" />
      <IconMissionSurveyMultiSelect v-if="type === MULTI_SELECT" />
      <IconMissionSurveyLikert v-if="type === LIKERT" />
      <IconMissionSurveyLinearScale v-if="type === LINEAR_SCALE" />
    </div>
    <div class="mission-create-survey-add-box-item-text">
      <p class="mission-create-survey-add-box-item-text-title">
        {{ TITLES[type] }}
      </p>
      <p class="mission-create-survey-add-box-item-text-description">
        {{ DESCRIPTIONS[type] }}
      </p>
    </div>
  </div>
</template>

<script>
import { MISSION_SURVEY_ITEMS, MISSION_SURVEY_USABILITY_HUB_ITEMS } from '../../constants'

const TITLES = {
  SHORT_TEXT: 'Short Text',
  LONG_TEXT: 'Long Text',
  SINGLE_SELECT: 'Single Select',
  MULTI_SELECT: 'Multi Select',
  LINEAR_SCALE: 'Linear Scale',
  LIKERT: 'Likert'
}
const DESCRIPTIONS = {
  SHORT_TEXT: 'Good for short answers, like names and what you had for lunch.',
  LONG_TEXT: 'Good for long answers like the Meaning of life.',
  SINGLE_SELECT: 'Give your participant options to choose from.',
  MULTI_SELECT: 'Give your participant options to choose from.',
  LINEAR_SCALE: 'Give your participant a numbered scale to choose from.',
  LIKERT: 'Set a task for participants to carry out by clicking through a series of screens.'
}

export default {
  name: 'MissionCreateSurveyAddBoxItem',
  data() {
    const { SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LIKERT, LINEAR_SCALE } = MISSION_SURVEY_ITEMS
    return { TITLES, DESCRIPTIONS, SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LIKERT, LINEAR_SCALE }
  },
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.values({ ...MISSION_SURVEY_ITEMS, ...MISSION_SURVEY_USABILITY_HUB_ITEMS }).includes(value)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyAddBoxItem";
</style>
