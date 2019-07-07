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
    <div class="mission-survey-results-first-click-heatmap" :class="{ expanded }">
      <SurveyItemMedia
        :image="result.imageUrl"
        :frame="result.deviceFrame"
        :heatmap-points="heatmapEnabled ? result.clickPoints : null"
        :heatmap-enabled="heatmapEnabled"
      />
    </div>
    <div class="mission-survey-results-first-click-expand" :class="[{ expanded }, result.type]" @click="expanded = !expanded">
      <div class="mission-survey-results-first-click-expand-shadow" />
      <IconAngleDown />
      <span v-if="!expanded">Expand</span>
      <span v-else>Collapse</span>
    </div>
  </div>
</template>

<script>
import SurveyItemMedia from '../../Survey/SurveyItemMedia/SurveyItemMedia'
import SwitchButton from '../../_shared/SwitchButton/SwitchButton'
export default {
  name: 'MissionSurveyResultsItemFirstClick',
  components: { SwitchButton, SurveyItemMedia },
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      heatmapEnabled: true,
      expanded: false
    }
  },
  computed: {
    missionPage() {
      return this.$store.state.missionPage
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyResultsItemFirstClick";
</style>
