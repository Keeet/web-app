<template>
  <div
    class="mission-recruit-insights-item"
    :class="{ create }"
    :title="insight ? insight.url : ''"
    @click="openUrl"
  >
    <div v-if="create" class="mission-recruit-insights-item-new">
      <IconPlusSlim />
    </div>
    <div v-else>
      <div class="mission-recruit-insights-item-head">
        <div class="mission-recruit-insights-item-head-icon">
          <IconInsightVideo v-if="type === RECORDING" />
          <IconInsightGeneric v-else-if="insight.linkType === GENERIC" />
          <IconInsightGoogleDocs v-else-if="insight.linkType === GOOGLE_DOCS" />
          <IconInsightAirtable v-else-if="insight.linkType === AIR_TABLE" />
        </div>
        <p class="mission-recruit-insights-item-head-title">
          {{ headTitle }}
        </p>
      </div>
      <div class="mission-recruit-insights-item-body">
        <p class="mission-recruit-insights-item-body-title">
          {{ insight.title }}
        </p>
        <p class="mission-recruit-insights-item-body-description">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { MISSION_RECRUIT_INSIGHTS, MISSION_RECRUIT_INSIGHT_LABELS, MISSION_RECRUIT_INSIGHT_LINKS, MISSION_RECRUIT_INSIGHT_LINK_LABELS } from '../../constants'
import { getDurationWithUnits } from '../../../utils/dateUtils'

export default {
  name: 'MissionRecruitInsightsItem',
  props: {
    type: {
      type: String,
      default: null,
      validator: value => Object.values(MISSION_RECRUIT_INSIGHTS).includes(value)
    },
    insight: {
      type: Object,
      default: null
    },
    create: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const { LINK, RECORDING } = MISSION_RECRUIT_INSIGHTS
    const { GENERIC, GOOGLE_DOCS, AIR_TABLE } = MISSION_RECRUIT_INSIGHT_LINKS
    return { LINK, RECORDING, GENERIC, GOOGLE_DOCS, AIR_TABLE }
  },
  computed: {
    headTitle() {
      if (this.type === MISSION_RECRUIT_INSIGHTS.LINK) {
        return MISSION_RECRUIT_INSIGHT_LINK_LABELS[this.insight.linkType]
      }
      return MISSION_RECRUIT_INSIGHT_LABELS[this.type]
    },
    description() {
      switch (this.type) {
        case MISSION_RECRUIT_INSIGHTS.LINK:
          return this.insight.description
        case MISSION_RECRUIT_INSIGHTS.RECORDING:
          return getDurationWithUnits(this.insight.duration)
      }
      return null
    }
  },
  methods: {
    openUrl() {
      if (!this.create && !!this.insight.url) {
        window.open(this.insight.url, '_blank')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionRecruitInsightsItem";
</style>
