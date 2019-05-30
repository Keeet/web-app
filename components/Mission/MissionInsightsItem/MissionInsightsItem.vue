<template>
  <div
    class="mission-insights-item"
    :class="{ create }"
    :title="insight ? insight.url : ''"
    @click="openUrl"
  >
    <div v-if="create" class="mission-insights-item-new">
      <IconPlusSlim />
    </div>
    <div v-else>
      <div class="mission-insights-item-head">
        <div class="mission-insights-item-head-icon">
          <IconInsightVideo v-if="type === RECORDING" />
          <IconInsightGeneric v-else-if="insight.linkType === GENERIC" />
          <IconInsightGoogleDocs v-else-if="insight.linkType === GOOGLE_DOCS" />
          <IconInsightAirtable v-else-if="insight.linkType === AIR_TABLE" />
        </div>
        <p class="mission-insights-item-head-title">
          {{ headTitle }}
        </p>
      </div>
      <div class="mission-insights-item-body">
        <p class="mission-insights-item-body-title">
          {{ insight.title }}
        </p>
        <p class="mission-insights-item-body-description">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { MISSION_INSIGHTS, MISSION_INSIGHT_LABELS, MISSION_INSIGHT_LINKS, MISSION_INSIGHT_LINK_LABELS } from '../../constants'
import { getDurationWithUnits } from '../../../utils/dateUtils'

export default {
  name: 'MissionInsightsItem',
  props: {
    type: {
      type: String,
      default: null,
      validator: value => Object.values(MISSION_INSIGHTS).includes(value)
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
    const { LINK, RECORDING } = MISSION_INSIGHTS
    const { GENERIC, GOOGLE_DOCS, AIR_TABLE } = MISSION_INSIGHT_LINKS
    return { LINK, RECORDING, GENERIC, GOOGLE_DOCS, AIR_TABLE }
  },
  computed: {
    headTitle() {
      if (this.type === MISSION_INSIGHTS.LINK) {
        return MISSION_INSIGHT_LINK_LABELS[this.insight.linkType]
      }
      return MISSION_INSIGHT_LABELS[this.type]
    },
    description() {
      switch (this.type) {
        case MISSION_INSIGHTS.LINK:
          return this.insight.description
        case MISSION_INSIGHTS.RECORDING:
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
  @import "MissionInsightsItem";
</style>
