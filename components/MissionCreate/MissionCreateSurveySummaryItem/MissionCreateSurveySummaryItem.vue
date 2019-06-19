<template>
  <div class="mission-create-survey-summary-item" :class="{ noDrag }">
    <div class="mission-create-survey-summary-item-icon" :class="type">
      <img v-if="type === TYPES.WELCOME" src="../../../assets/img/welcomeEmoji.png">
      <img v-else-if="type === TYPES.CLOSING" src="../../../assets/img/thankYouEmoji.png">
      <MissionCreateSurveyIcon v-else :type="type" />
    </div>
    <p class="mission-create-survey-summary-item-text">
      <span v-if="index !== null">{{ index + 1 }}</span>
      <span>{{ label }}</span>
    </p>
    <div v-if="!noDrag" class="mission-create-survey-summary-item-drag">
      <IconDragDrop />
    </div>
  </div>
</template>

<script>
import {
  MISSIONS,
  MISSION_SURVEY_ITEMS,
  MISSION_SURVEY_USABILITY_LAB_ITEMS,
  MISSION_SURVEY_ITEM_LABELS,
  MISSION_SURVEY_USABILITY_LAB_ITEM_LABELS
} from '../../constants'
import MissionCreateSurveyIcon from '../MissionCreateSurveyIcon/MissionCreateSurveyIcon'

const TYPES = {
  WELCOME: 'WELCOME',
  CLOSING: 'CLOSING',
  ...MISSION_SURVEY_ITEMS,
  ...MISSION_SURVEY_USABILITY_LAB_ITEMS
}

export default {
  name: 'MissionCreateSurveySummaryItem',
  components: { MissionCreateSurveyIcon },
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.values(TYPES).includes(value)
    },
    index: {
      type: Number,
      default: null
    },
    noDrag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { TYPES, MISSION_SURVEY_ITEM_LABELS }
  },
  computed: {
    s() {
      return this.$store.state.missionForm
    },
    label() {
      if (this.type === TYPES.WELCOME) {
        return 'Welcome Screen'
      }
      if (this.type === TYPES.CLOSING) {
        return 'Thank-you Screen'
      }
      if (this.s.type === MISSIONS.SURVEY) {
        return MISSION_SURVEY_ITEM_LABELS[this.type]
      }
      if (this.s.type === MISSIONS.USABILITY_LAB) {
        return MISSION_SURVEY_USABILITY_LAB_ITEM_LABELS[this.type]
      }
      return null
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveySummaryItem";
</style>
