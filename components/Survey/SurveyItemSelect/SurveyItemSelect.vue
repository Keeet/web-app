<template>
  <div class="survey-item-select">
    <SurveyItemSelectChoice
      v-for="(choice, x) in item.choices"
      :key="x"
      :choice="choice"
      :selected="isSelected(choice)"
      @click="select(choice)"
    />
  </div>
</template>

<script>
import { MISSION_SURVEY_ITEMS } from '../../constants'
import SurveyItemSelectChoice from '../SurveyItemSelectChoice/SurveyItemSelectChoice'
export default {
  name: 'SurveyItemSelect',
  components: { SurveyItemSelectChoice },
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
      if (!this.item.required) {
        return null
      }
      if (this.multiSelect) {
        return this.response.selected.length > 0 ? null : 'required'
      } else {
        return this.response.selected !== null ? null : 'required'
      }
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
