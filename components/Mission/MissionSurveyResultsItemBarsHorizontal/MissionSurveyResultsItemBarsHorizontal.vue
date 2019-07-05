<template>
  <div class="mission-survey-results-item-bars-horizontal">
    <MissionSurveyResultsItemBarsHorizontalItem
      v-for="(item, x) in sortedResults"
      :key="x"
      :subject="getSubject(item)"
      :absolute="item.absolute"
      :relative="item.relative"
      :survey-type="result.type"
    />
  </div>
</template>

<script>
import { MISSION_SURVEY_ITEMS, MISSION_SURVEY_ITEM_LIKERT_OPTIONS, MISSION_SURVEY_SELECT_OTHER_LABEL } from '../../constants'
import MissionSurveyResultsItemBarsHorizontalItem
  from '../MissionSurveyResultsItemBarsHorizontalItem/MissionSurveyResultsItemBarsHorizontalItem'

const { SINGLE_SELECT, MULTI_SELECT, LIKERT } = MISSION_SURVEY_ITEMS

export default {
  name: 'MissionSurveyResultsItemBarsHorizontal',
  components: { MissionSurveyResultsItemBarsHorizontalItem },
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  computed: {
    results() {
      return this.result.results.slice()
    },
    sortedResults() {
      const results = [
        ...this.results,
        ...this.emptyOptions.map(r => ({ ...r, absolute: 0, relative: 0 }))
      ]

      if (this.surveyItem.type === LIKERT) {
        return results.sort((a, b) => a.index > b.index ? 1 : -1)
      }
      return results.sort((a, b) => a.absolute > b.absolute ? -1 : 1)
    },
    surveyItem() {
      return this.$store.state.survey.items.find(i => i.id === this.result.id)
    },
    emptyOptions() {
      if (this.surveyItem.type === LIKERT) {
        return MISSION_SURVEY_ITEM_LIKERT_OPTIONS[this.surveyItem.answerType]
          .map((_, index) => ({ index }))
          .filter((option) => {
            return !this.results.map(r => r.index).includes(option.index)
          })
      }
      if ([SINGLE_SELECT, MULTI_SELECT].includes(this.surveyItem.type)) {
        const hasOther = this.surveyItem.otherAvailable
        const choicesWithOther = [
          ...this.surveyItem.choices,
          hasOther ? MISSION_SURVEY_SELECT_OTHER_LABEL : []
        ].flatMap(c => c)

        return choicesWithOther
          .filter(choice => !this.results.map(r => r.text).includes(choice))
          .map(choice => ({ text: choice }))
      }
      return null
    }
  },
  methods: {
    getSubject(item) {
      if (item.text) {
        return item.text
      }
      if (this.result.type === LIKERT) {
        return MISSION_SURVEY_ITEM_LIKERT_OPTIONS[this.surveyItem.answerType][item.index]
      }
    }
  }
}
</script>
