<template>
  <div class="mission-recruit-insights">
    <div
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-once="true"
      data-aos-anchor=".mission-recruit-insights"
    >
      <div class="mission-recruit-insights-links">
        <MissionRecruitInsightsItem
          v-for="(insight, x) in linkInsights"
          :key="x"
          :insight="insight"
          type="LINK"
        />
        <MissionRecruitInsightsItem
          v-if="!isSample && $hasAnyRole(['ADMIN', 'USER'])"
          create
          @click.native="createMissionInsightLink"
        />
      </div>
    </div>
    <div
      v-if="recordingInsights.length"
      data-aos="fade-up"
      data-aos-duration="700"
      :data-aos-delay="200"
      data-aos-once="true"
      data-aos-anchor=".mission-recruit-insights"
    >
      <p class="mission-recruit-insights-section-headline">
        Recordings
      </p>
      <div class="mission-recruit-insights-recordings">
        <MissionRecruitInsightsItem
          v-for="(insight, x) in recordingInsights"
          :key="x"
          :insight="insight"
          type="RECORDING"
        />
      </div>
    </div>
    <MissionRecruitInsightsForm v-if="missionPage.insightFormOpened" />
  </div>
</template>

<script>

import MissionRecruitInsightsForm from '../MissionRecruitInsightsForm/MissionRecruitInsightsForm'
import MissionRecruitInsightsItem from '../MissionRecruitInsightsItem/MissionRecruitInsightsItem'
export default {
  name: 'MissionRecruitInsights',
  components: { MissionRecruitInsightsItem, MissionRecruitInsightsForm },
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
  @import "MissionRecruitInsights";
</style>
