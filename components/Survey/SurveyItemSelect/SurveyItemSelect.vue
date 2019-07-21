<template>
  <div class="survey-item-select">
    <SurveyItemSelectChoice
      v-for="(choice, x) in item.choices"
      :key="x"
      :choice="choice"
      :selected="isSelected(choice)"
      @click="select(choice)"
    />
    <SurveyItemSelectChoice
      v-if="item.otherAvailable && !hasOtherAlready"
      :choice="$t('survey.items.selectQuestion.other', $store.state.survey.language)"
      :selected="isSelected(MISSION_SURVEY_SELECT_OTHER_LABEL)"
      @click="select(MISSION_SURVEY_SELECT_OTHER_LABEL)"
    />
  </div>
</template>

<script>
import { MISSION_SURVEY_ITEMS, MISSION_SURVEY_SELECT_OTHER_LABEL } from '../../constants'
import SurveyItemSelectChoice from '../SurveyItemSelectChoice/SurveyItemSelectChoice'
export default {
  name: 'SurveyItemSelect',
  components: { SurveyItemSelectChoice },
  data() {
    return { MISSION_SURVEY_SELECT_OTHER_LABEL }
  },
  computed: {
    item() {
      return this.$store.getters['surveyForm/activeItem']
    },
    multiSelect() {
      return this.item.type === MISSION_SURVEY_ITEMS.MULTI_SELECT
    },
    response() {
      return this.$store.getters['surveyForm/activeResponse']
    },
    error() {
      if (this.multiSelect) {
        return this.response.selected.length > 0 ? null : 'required'
      } else {
        return this.response.selected !== null ? null : 'required'
      }
    },
    hasOtherAlready() {
      return this.item.choices
        .map(choice => choice.toLowerCase())
        .includes(MISSION_SURVEY_SELECT_OTHER_LABEL.toLowerCase())
    }
  },
  watch: {
    error: {
      immediate: true,
      handler(error) {
        this.$store.dispatch('surveyForm/handleValidationError', { error })
      }
    }
  },
  methods: {
    isSelected(choice) {
      if (this.multiSelect) {
        return this.response.selected.includes(choice)
      } else {
        return this.response.selected === choice
      }
    },
    select(choice) {
      const mutation = this.multiSelect ? 'surveyForm/multiSelect' : 'surveyForm/singleSelect'
      this.$store.commit(mutation, choice)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SurveyItemSelect";
</style>
