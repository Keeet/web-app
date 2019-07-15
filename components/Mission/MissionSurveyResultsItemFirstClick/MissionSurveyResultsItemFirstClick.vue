<template>
  <div class="mission-survey-results-first-click">
    <div class="mission-survey-results-first-click-switch">
      <SwitchButton
        :on="heatmapEnabled"
        label="Heatmap"
        small
        bg-color-class="FIRST_CLICK"
        @switch="heatmapEnabled = !heatmapEnabled"
      />
    </div>
    <MissionSurveyResultsItemMedia
      :result="result"
      :heatmap-points="result.clickPoints"
      :heatmap-enabled="heatmapEnabled"
    />
  </div>
</template>

<script>
import SwitchButton from '../../_shared/SwitchButton/SwitchButton'
import MissionSurveyResultsItemMedia from '../MissionSurveyResultsItemMedia/MissionSurveyResultsItemMedia'
export default {
  name: 'MissionSurveyResultsItemFirstClick',
  components: { MissionSurveyResultsItemMedia, SwitchButton },
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      heatmapEnabled: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyResultsItemFirstClick";
</style>
