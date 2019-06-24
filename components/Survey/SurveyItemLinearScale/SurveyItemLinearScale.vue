<template>
  <div class="survey-item-linear-scale">
    <div v-if="item.startLabel && item.endLabel" class="survey-item-linear-scale-labels">
      <p>
        {{ item.startLabel }}
      </p>
      <p>
        {{ item.endLabel }}
      </p>
    </div>
    <div class="survey-item-linear-scale-options">
      <div
        v-for="x in options"
        :key="x"
        class="survey-item-linear-scale-options-item"
        :class="{ selected: isSelected(x) }"
        :style="{ backgroundColor: isSelected(x) ? s.color : null }"
        @click="selectValue(x)"
      >
        {{ x }}
      </div>
    </div>
  </div>
</template>

<script>
import { range } from '../../../utils/objectUtils'

export default {
  name: 'SurveyItemLinearScale',
  computed: {
    s() {
      return this.$store.state.survey
    },
    item() {
      return this.$store.getters['surveyForm/activeItem']
    },
    response() {
      return this.$store.getters['surveyForm/activeResponse']
    },
    options() {
      return range(this.item.startValue, this.item.endValue)
    },
    error() {
      return !this.item.required || this.response.value !== null ? null : 'required'
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
    isSelected(value) {
      return this.response.value === value
    },
    selectValue(value) {
      this.$store.commit('surveyForm/setLinearScaleValue', value)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SurveyItemLinearScale";
</style>
