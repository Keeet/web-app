<template>
  <div class="mission-survey-results-item-bars-horizontal-item" :class="{ first, last }">
    <div class="mission-survey-results-item-bars-horizontal-item-subject">
      <img v-if="surveyType === PREFERENCE_TEST" :src="subject">
      <span v-else>{{ subject }}</span>
    </div>
    <div class="mission-survey-results-item-bars-horizontal-item-bar">
      <div class="mission-survey-results-item-bars-horizontal-item-bar-bg" :class="bgColorClass" />
      <div
        class="mission-survey-results-item-bars-horizontal-item-bar-fill"
        :class="bgColorClass"
        :style="{ width: fillWidth }"
      />
      <p class="mission-survey-results-item-bars-horizontal-item-bar-percent">
        {{ percentText }}
      </p>
      <p class="mission-survey-results-item-bars-horizontal-item-bar-responses">
        {{ absolute }} {{ absolute === 1 ? 'response' : 'responses' }}
      </p>
    </div>
  </div>
</template>

<script>
import { MISSION_SURVEY_ITEMS, MISSION_SURVEY_USABILITY_LAB_ITEMS } from '../../constants'

export default {
  name: 'MissionSurveyResultsItemBarsHorizontalItem',
  props: {
    subject: {
      type: String,
      required: true
    },
    absolute: {
      type: Number,
      required: true
    },
    relative: {
      type: Number,
      required: true
    },
    surveyType: {
      type: String,
      required: true,
      validator: value => Object.values({
        ...MISSION_SURVEY_ITEMS,
        ...MISSION_SURVEY_USABILITY_LAB_ITEMS
      }).includes(value)
    },
    bgColorClass: {
      type: String,
      required: true
    },
    first: {
      type: Boolean,
      default: false
    },
    last: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showFill: false,
      ...MISSION_SURVEY_USABILITY_LAB_ITEMS
    }
  },
  computed: {
    percent() {
      return Math.round(this.relative * 10) / 10
    },
    fillWidth() {
      return this.showFill ? `${this.percent}%` : null
    },
    percentText() {
      return `${this.percent} %`
    }
  },
  mounted() {
    window.setTimeout(() => {
      this.showFill = true
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyResultsItemBarsHorizontalItem";
</style>
