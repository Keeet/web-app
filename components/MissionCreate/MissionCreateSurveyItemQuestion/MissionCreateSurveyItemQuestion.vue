<template>
  <div class="mission-create-survey-item-question">
    <!-- eslint-disable -->
    <Input
      :title="title || 'Question'"
      placeholder="Type question here"
      :value="value"
      :error="error"
      dispatch-error="missionForm/handleValidationError"
      :disable-error="!showError && !s.showErrors"
      :no-margin="noMargin"
      @change="setQuestion"
      @focusout="showError = true"
    >
      <template slot="additional">
        <div class="mission-create-survey-item-question-switch">
          <SwitchButton
            label="Required"
            :on="required"
            :bg-color-class="bgColorClass || type"
            small
            @switch="switchRequired"
          />
        </div>
      </template>
    </Input>
  </div>
</template>

<script>
import SwitchButton from '../../_shared/SwitchButton/SwitchButton'
import Input from '../../_shared/Input/Input'
export default {
  name: 'MissionCreateSurveyItemQuestion',
  components: { Input, SwitchButton },
  props: {
    index: {
      type: Number,
      required: true
    },
    followUpIndex: {
      type: Number,
      default: null
    },
    type: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: null
    },
    noMargin: {
      type: Boolean,
      default: false
    },
    bgColorClass: {
      type: String,
      default: null
    }
  },
  data() {
    return { showError: false }
  },
  computed: {
    s() {
      return this.$store.state.missionForm
    },
    error() {
      return this.value !== '' ? null : 'required'
    }
  },
  methods: {
    switchRequired() {
      this.$store.commit('missionFormSurvey/setItemQuestionRequired', {
        itemIndex: this.index,
        followUpIndex: this.followUpIndex,
        required: !this.required
      })
    },
    setQuestion(question) {
      this.$store.commit('missionFormSurvey/setItemQuestion', {
        itemIndex: this.index,
        followUpIndex: this.followUpIndex,
        question
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyItemQuestion";
</style>
