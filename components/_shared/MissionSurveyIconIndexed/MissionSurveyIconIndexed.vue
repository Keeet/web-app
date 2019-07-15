<template>
  <div class="mission-survey-icon-indexed" :class="type">
    <div class="mission-survey-icon-indexed-inner">
      <MissionSurveyIcon :type="type" />
    </div>
    <span>{{ index }}</span>
  </div>
</template>

<script>
import MissionSurveyIcon from '../MissionSurveyIcon/MissionSurveyIcon'
export default {
  name: 'MissionSurveyIconIndexed',
  components: { MissionSurveyIcon },
  props: {
    type: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyIconIndexed";
</style>
