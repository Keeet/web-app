<template>
  <div class="mission-create-survey-item-first-click">
    <MissionCreateSurveyUsabilityLabUpload :index="index" />
  </div>
</template>

<script>
import MissionCreateSurveyUsabilityLabUpload
  from '../MissionCreateSurveyUsabilityLabUpload/MissionCreateSurveyUsabilityLabUpload'
export default {
  name: 'MissionCreateSurveyItemFirstClick',
  components: { MissionCreateSurveyUsabilityLabUpload },
  props: {
    index: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionCreateSurveyItemFirstClick";
</style>
