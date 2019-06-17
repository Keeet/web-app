<template>
  <div class="mission-create-survey-item-question">
    <!-- eslint-disable -->
    <Input
      :title="title || 'Question'"
      placeholder="Type question here"
      :value="value"
      :error="error"
      :disable-error="!showError"
      @change="setQuestion"
      @focusout="showError = true"
    >
      <template slot="additional">
        <div class="mission-create-survey-item-question-switch">
          <SwitchButton
            label="Required"
            :on="required"
            :bg-color-class="type"
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
    }
  },
  data() {
    return { showError: false }
  },
  computed: {
    error() {
      return this.value !== '' ? null : 'required'
    }
  },
  methods: {
    switchRequired() {
      this.$store.commit('missionFormSurvey/setItemQuestionRequired', {
        index: this.index,
        required: !this.required
      })
    },
    setQuestion(question) {
      this.$store.commit('missionFormSurvey/setItemQuestion', {
        index: this.index,
        question
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyItemQuestion";
</style>
