<template>
  <div class="mission-survey-results-item-bars-vertical">
    <p class="mission-survey-results-item-bars-vertical-average">
      &Oslash; = {{ average }}
    </p>
    <div
      v-if="surveyItem.startLabel && surveyItem.endLabel"
      class="mission-survey-results-item-bars-vertical-labels"
    >
      <span>{{ surveyItem.startLabel }}</span>
      <span>{{ surveyItem.endLabel }}</span>
    </div>
    <div class="mission-survey-results-item-bars-vertical-bars">
      <MissionSurveyResultsItemBarsVerticalItem
        v-for="(bar, x) in bars"
        :key="x"
        :index="bar.index"
        :absolute="bar.absolute"
        :relative="bar.relative"
        :survey-type="surveyItem.type"
      />
    </div>
  </div>
</template>

<script>
import { range } from '../../../utils/objectUtils'
import MissionSurveyResultsItemBarsVerticalItem
  from '../MissionSurveyResultsItemBarsVerticalItem/MissionSurveyResultsItemBarsVerticalItem'

export default {
  name: 'MissionSurveyResultsItemBarsVertical',
  components: { MissionSurveyResultsItemBarsVerticalItem },
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  computed: {
    results() {
      return this.result.results
    },
    surveyItem() {
      return this.$store.getters.getSurveyItemById(this.result.id)
    },
    average() {
      return Math.round(this.result.average * 10) / 10
    },
    bars() {
      return range(this.surveyItem.startValue, this.surveyItem.endValue)
        .map((x) => {
          const result = this.results.find(r => r.index === x)
          return result || {
            absolute: 0,
            relative: 0,
            index: x
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionSurveyResultsItemBarsVertical";
</style>
