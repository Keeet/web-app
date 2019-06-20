<template>
  <div class="mission-create-survey-item-design-question">
    <MissionCreateSurveyUsabilityLabUpload :index="index" />
  </div>
</template>

<script>
import MissionCreateSurveyUsabilityLabUpload
  from '../MissionCreateSurveyUsabilityLabUpload/MissionCreateSurveyUsabilityLabUpload'
export default {
  name: 'MissionCreateSurveyItemDesignQuestion',
  components: { MissionCreateSurveyUsabilityLabUpload },
  props: {
    index: {
      type: Number,
      required: true
    }
  }
}
</script>
