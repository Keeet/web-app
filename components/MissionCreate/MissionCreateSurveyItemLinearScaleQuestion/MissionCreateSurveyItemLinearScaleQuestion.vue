<template>
  <div class="mission-create-survey-item-linear-scale-question">
    <div class="mission-create-survey-item-linear-scale-question-form">
      <MissionCreateSurveyItemLinearScaleQuestionBorder :item="item" :index="index" :is-start="true" :follow-up-index="followUpIndex" />
      <MissionCreateSurveyItemLinearScaleQuestionBorder :item="item" :index="index" :is-start="false" :follow-up-index="followUpIndex" />
    </div>
  </div>
</template>

<script>
import MissionCreateSurveyItemLinearScaleQuestionBorder
  from '../MissionCreateSurveyItemLinearScaleQuestionBorder/MissionCreateSurveyItemLinearScaleQuestionBorder'
export default {
  name: 'MissionCreateSurveyItemLinearScaleQuestion',
  components: { MissionCreateSurveyItemLinearScaleQuestionBorder },
  props: {
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
    item() {
      const item = this.$store.state.missionFormSurvey.items[this.index]
      if (this.followUpIndex !== null) {
        return item.followUps[this.followUpIndex]
      }
      return item
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionCreateSurveyItemLinearScaleQuestion";
</style>
