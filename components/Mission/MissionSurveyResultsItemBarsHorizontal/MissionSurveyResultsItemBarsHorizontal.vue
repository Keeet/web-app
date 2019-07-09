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
import { MISSION_SURVEY_ITEMS, MISSION_SURVEY_USABILITY_LAB_ITEMS, MISSION_SURVEY_ITEM_LIKERT_OPTIONS, MISSION_SURVEY_SELECT_OTHER_LABEL } from '../../constants'
import MissionSurveyResultsItemBarsHorizontalItem
  from '../MissionSurveyResultsItemBarsHorizontalItem/MissionSurveyResultsItemBarsHorizontalItem'
import { flatMap } from '../../../utils/objectUtils'

const { SINGLE_SELECT, MULTI_SELECT, LIKERT } = MISSION_SURVEY_ITEMS
const { PREFERENCE_TEST } = MISSION_SURVEY_USABILITY_LAB_ITEMS

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
      return this.$store.getters.getSurveyItemById(this.result.id)
    },
    emptyOptions() {
      if ([SINGLE_SELECT, MULTI_SELECT].includes(this.surveyItem.type)) {
        const hasOther = this.surveyItem.otherAvailable
        const choicesWithOtherDeepArray = [
          ...this.surveyItem.choices,
          hasOther ? MISSION_SURVEY_SELECT_OTHER_LABEL : []
        ]
        const choicesWithOther = flatMap(choicesWithOtherDeepArray)

        return choicesWithOther
          .filter(choice => !this.results.map(r => r.text).includes(choice))
          .map(choice => ({ text: choice }))
      }
      if (this.surveyItem.type === LIKERT) {
        return MISSION_SURVEY_ITEM_LIKERT_OPTIONS[this.surveyItem.answerType]
          .map((_, index) => ({ index }))
          .filter((option) => {
            return !this.results.map(r => r.index).includes(option.index)
          })
      }
      if (this.surveyItem.type === PREFERENCE_TEST) {
        return this.surveyItem.images
          .filter(item => !this.results.map(r => r.image).includes(item.url))
          .map(item => ({ image: item.url }))
      }
      return null
    }
  },
  methods: {
    getSubject(item) {
      if (item.text) {
        return item.text
      }
      switch (this.result.type) {
        case LIKERT:
          return MISSION_SURVEY_ITEM_LIKERT_OPTIONS[this.surveyItem.answerType][item.index]
        case PREFERENCE_TEST:
          return item.image
      }
    }
  }
}
</script>
