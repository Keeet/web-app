<template>
  <div class="mission-survey-results-item-bars-horizontal-item" :class="{ first, last }">
    <div class="mission-survey-results-item-bars-horizontal-item-subject">
      <ThumborImage
        v-if="surveyType === PREFERENCE_TEST"
        class="mission-survey-results-item-bars-horizontal-item-subject-img"
        :src="subject"
        :width="500"
        auto-width
      />
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
        {{ $tc('mission.survey.results.countResponses', $store.state.locale, { count: absolute }) }}
      </p>
    </div>
  </div>
</template>

<script>
import { MISSION_SURVEY_ITEMS, MISSION_SURVEY_USABILITY_LAB_ITEMS } from '../../constants'
import ThumborImage from '../../_shared/ThumborImage/ThumborImage'

export default {
  name: 'MissionSurveyResultsItemBarsHorizontalItem',
  components: { ThumborImage },
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
      validator: value => Object.keys({
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
    }, 500)
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyResultsItemBarsHorizontalItem";
</style>
