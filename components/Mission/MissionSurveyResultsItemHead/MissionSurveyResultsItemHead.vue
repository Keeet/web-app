<template>
  <div class="mission-survey-results-item-head">
    <div v-if="!hideIcon" class="mission-survey-results-item-head-icon">
      <MissionSurveyIconIndexed :index="index" :type="result.type" />
    </div>
    <div class="mission-survey-results-item-head-text">
      <p class="mission-survey-results-item-head-text-title">
        <span v-if="hideIcon">{{ index }}. </span>
        {{ title }}
      </p>
      <p
        v-if="isNum(result.actualCount) && result.type !== INSTRUCTION"
        class="mission-survey-results-item-head-text-subtitle"
      >
        {{ result.actualCount }} out of {{ mission.actualCount }} response
      </p>
    </div>
  </div>
</template>

<script>
import { isNum } from '../../../utils/stringUtils'
import {
  MISSION_SURVEY_USABILITY_LAB_ITEMS,
  MISSION_SURVEY_USABILITY_LAB_ITEM_INSIGHTS
} from '../../constants'
import MissionSurveyIconIndexed from '../../_shared/MissionSurveyIconIndexed/MissionSurveyIconIndexed'

const {
  FIVE_SECOND_TEST
} = MISSION_SURVEY_USABILITY_LAB_ITEMS

export default {
  name: 'MissionSurveyResultsItemHead',
  components: { MissionSurveyIconIndexed },
  props: {
    index: {
      type: Number,
      required: true
    },
    result: {
      type: Object,
      required: true
    },
    hideIcon: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { ...MISSION_SURVEY_USABILITY_LAB_ITEMS }
  },
  computed: {
    mission() {
      return this.$store.state.mission
    },
    surveyItem() {
      return this.$store.getters.getSurveyItemById(this.result.id)
    },
    title() {
      if (this.result.type === FIVE_SECOND_TEST) {
        return MISSION_SURVEY_USABILITY_LAB_ITEM_INSIGHTS[FIVE_SECOND_TEST]
          .replace('{duration}', this.result.duration)
      }
      if (MISSION_SURVEY_USABILITY_LAB_ITEM_INSIGHTS[this.result.type]) {
        return MISSION_SURVEY_USABILITY_LAB_ITEM_INSIGHTS[this.result.type]
      }
      return this.surveyItem.text || this.surveyItem.instruction
    }
  },
  methods: {
    isNum
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyResultsItemHead.scss";
</style>
