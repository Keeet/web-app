<template>
  <div class="mission-insights">
    <div
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-once="true"
      data-aos-anchor=".mission-insights"
    >
      <div class="mission-insights-links">
        <MissionInsightsItem
          v-for="(insight, x) in linkInsights"
          :key="x"
          :insight="insight"
          type="LINK"
        />
        <MissionInsightsItem v-if="!isSample" create />
      </div>
    </div>
    <div
      data-aos="fade-up"
      data-aos-duration="800"
      :data-aos-delay="400"
      data-aos-once="true"
      data-aos-anchor=".mission-insights"
    >
      <p class="mission-insights-section-headline">
        Recordings
      </p>
      <div class="mission-insights-recordings">
        <MissionInsightsItem
          v-for="(insight, x) in recordingInsights"
          :key="x"
          :insight="insight"
          type="RECORDING"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MissionInsightsItem from '../MissionInsightsItem/MissionInsightsItem'
export default {
  name: 'MissionInsights',
  components: { MissionInsightsItem },
  computed: {
    mission() {
      return this.$store.state.mission
    },
    isSample() {
      return this.$store.state.mission.id.startsWith('sample')
    },
    linkInsights() {
      return this.mission.insights.filter(insight => !!insight.linkType)
    },
    recordingInsights() {
      return this.mission.insights.filter(insight => !!insight.vimeoUrl)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionInsights";
</style>
