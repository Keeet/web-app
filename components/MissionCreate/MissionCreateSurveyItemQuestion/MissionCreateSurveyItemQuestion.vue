<template>
  <div class="mission-create-survey-item-question">
    <p class="mission-create-survey-item-question-title">
      {{ title || 'Question' }}
    </p>
    <div class="mission-create-survey-item-question-input">
      <div class="mission-create-survey-item-question-input-area">
        <input
          v-model="question"
          type="text"
          placeholder="Type question here"
        >
      </div>
      <div class="mission-create-survey-item-question-input-switch">
        <SwitchButton
          label="Required"
          :on="required"
          :bg-color-class="type"
          small
          @switch="switchRequired"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SwitchButton from '../../_shared/SwitchButton/SwitchButton'
export default {
  name: 'MissionCreateSurveyItemQuestion',
  components: { SwitchButton },
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
  computed: {
    question: {
      get() {
        return this.value
      },
      set(question) {
        this.$store.commit('missionFormSurvey/setItemQuestion', {
          index: this.index,
          question
        })
      }
    }
  },
  methods: {
    switchRequired() {
      this.$store.commit('missionFormSurvey/setItemQuestionRequired', {
        index: this.index,
        required: !this.required
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyItemQuestion";
</style>
