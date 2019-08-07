<template>
  <MissionCreateSurveyAddBox v-if="itemAddIndex === index" />
  <div v-else class="mission-create-survey-item-add">
    <hr class="mission-create-survey-item-add-line">
    <div
      class="mission-create-survey-item-add-body"
      @click="$store.commit('missionFormSurvey/setItemAddIndex', index)"
    >
      <div class="mission-create-survey-item-add-body-icon">
        <IconPlus />
      </div>
      <p class="mission-create-survey-item-add-body-text">
        Add a new task
      </p>
    </div>
    <hr class="mission-create-survey-item-add-line">
  </div>
</template>

<script>
import MissionCreateSurveyAddBox from '../MissionCreateSurveyAddBox/MissionCreateSurveyAddBox'
export default {
  name: 'MissionCreateSurveyAdd',
  components: { MissionCreateSurveyAddBox },
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    itemAddIndex() {
      return this.$store.state.missionFormSurvey.itemAddIndex
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyAdd";
</style>
