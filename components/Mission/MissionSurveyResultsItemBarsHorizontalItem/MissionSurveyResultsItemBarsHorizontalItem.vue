<template>
  <div class="mission-survey-results-item-bars-horizontal-item">
    <div class="mission-survey-results-item-bars-horizontal-item-subject">
      {{ subject }}
    </div>
    <div class="mission-survey-results-item-bars-horizontal-item-bar">
      <div class="mission-survey-results-item-bars-horizontal-item-bar-bg" :class="surveyType" />
      <div
        class="mission-survey-results-item-bars-horizontal-item-bar-fill"
        :class="surveyType"
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
    }
  },
  data() {
    return {
      showFill: false
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
