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
        <MissionInsightsItem
          v-if="!isSample"
          create
          @click.native="createMissionInsightLink"
        />
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
    <MissionInsightsForm v-if="missionPage.insightFormOpened" />
  </div>
</template>

<script>
import MissionInsightsItem from '../MissionInsightsItem/MissionInsightsItem'
import MissionInsightsForm from '../MissionInsightsForm/MissionInsightsForm'
export default {
  name: 'MissionInsights',
  components: { MissionInsightsForm, MissionInsightsItem },
  computed: {
    mission() {
      return this.$store.state.mission
    },
    insights() {
      return this.$store.state.missionInsights
    },
    missionPage() {
      return this.$store.state.missionPage
    },
    isSample() {
      return this.$store.state.mission.id.startsWith('sample')
    },
    linkInsights() {
      return this.insights.filter(insight => !!insight.linkType)
    },
    recordingInsights() {
      return this.insights.filter(insight => !!insight.vimeoUrl)
    }
  },
  methods: {
    createMissionInsightLink() {
      this.$store.commit('missionInsightsForm/init', this.mission)
      this.$store.commit('missionPage/openInsightForm')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionInsights";
</style>
