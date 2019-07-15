<template>
  <div class="mission-survey-results-item-bars-vertical-item">
    <div class="mission-survey-results-item-bars-vertical-item-bg" :class="bgColorClass" />
    <div
      class="mission-survey-results-item-bars-vertical-item-fill"
      :class="bgColorClass"
      :style="{ height: fillHeight }"
    />
    <div class="mission-survey-results-item-bars-vertical-item-head">
      <p class="mission-survey-results-item-bars-vertical-item-percent">
        {{ percentText }}
      </p>
      <p class="mission-survey-results-item-bars-vertical-item-responses">
        {{ absolute }}
      </p>
    </div>
    <p class="mission-survey-results-item-bars-vertical-item-index">
      {{ index }}
    </p>
  </div>
</template>

<script>
import { MISSION_SURVEY_ITEMS, MISSION_SURVEY_USABILITY_LAB_ITEMS } from '../../constants'

export default {
  name: 'MissionSurveyResultsItemBarsVerticalItem',
  props: {
    index: {
      type: Number,
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
    bgColorClass: {
      type: String,
      required: true,
      validator: value => Object.keys({
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
      return this.relative
    },
    fillHeight() {
      return this.showFill ? `${this.percent}%` : null
    },
    percentText() {
      return `${Math.round(this.percent)}%`
    }
  },
  mounted() {
    window.setTimeout(() => {
      this.showFill = true
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionSurveyResultsItemBarsVerticalItem";
</style>
