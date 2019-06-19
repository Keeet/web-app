<template>
  <div class="mission-create-survey-item-linear-scale-question-border">
    <div class="mission-create-survey-item-linear-scale-question-border-select">
      <p class="mission-create-survey-item-linear-scale-question-border-select-label">
        {{ isStart ? 'Start value' : 'End value' }}
      </p>
      <div class="mission-create-survey-item-linear-scale-question-border-select-dropdown">
        <Select
          :value="selectValue"
          :options="selectOptions"
          no-margin
          @change="setValue"
        />
      </div>
    </div>
    <div class="mission-create-survey-item-linear-scale-question-border-input">
      <Input
        :value="labelValue"
        :placeholder="labelPlaceholder"
        no-margin
        @change="setLabel"
      />
    </div>
  </div>
</template>

<script>
import Select from '../../_shared/Select/Select'
import Input from '../../_shared/Input/Input'
export default {
  name: 'MissionCreateSurveyItemLinearScaleQuestionBorder',
  components: { Input, Select },
  props: {
    isStart: {
      type: Boolean,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    followUpIndex: {
      type: Number,
      default: null
    }
  },
  computed: {
    selectOptions() {
      return (this.isStart
        ? [0, 1]
        : [2, 3, 4, 5, 6, 7, 8, 9, 10]).map(option => ({ value: option, label: option }))
    },
    selectValue() {
      return this.isStart
        ? this.item.startValue
        : this.item.endValue
    },
    labelValue() {
      return this.isStart
        ? this.item.startLabel
        : this.item.endLabel
    },
    labelPlaceholder() {
      return this.isStart
        ? 'Start label (left) - optional'
        : 'End label (right) - optional'
    }
  },
  methods: {
    setValue(value) {
      const mutation = this.isStart
        ? 'missionFormSurvey/setItemLinearScaleStartValue'
        : 'missionFormSurvey/setItemLinearScaleEndValue'

      this.$store.commit(mutation, {
        itemIndex: this.index,
        followUpIndex: this.followUpIndex,
        value
      })
    },
    setLabel(label) {
      const mutation = this.isStart
        ? 'missionFormSurvey/setItemLinearScaleStartLabel'
        : 'missionFormSurvey/setItemLinearScaleEndLabel'

      this.$store.commit(mutation, {
        itemIndex: this.index,
        followUpIndex: this.followUpIndex,
        label
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionCreateSurveyItemLinearScaleQuestionBorder";
</style>
