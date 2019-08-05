<template>
  <div :id="id" class="mission-survey-results-item-media">
    <div class="mission-survey-results-item-media-content" :class="{ expanded }">
      <div class="mission-survey-results-item-media-content-inner">
        <SurveyItemMedia
          :image="result.imageUrl"
          :frame="result.deviceFrame"
          :heatmap-points="heatmapPoints"
          :heatmap-enabled="heatmapEnabled"
          @imageLoad="onResize"
        />
      </div>
    </div>
    <div
      v-show="expandable"
      class="mission-survey-results-item-media-expand"
      :class="[{ expanded }, result.type]"
      @click="expanded = !expanded"
    >
      <div class="mission-survey-results-item-media-expand-shadow" />
      <IconAngleDown />
      <span v-if="!expanded">
        {{ $t('mission.survey.results.expandButton', $store.state.locale) }}
      </span>
      <span v-else>
        {{ $t('mission.survey.results.collapseButton', $store.state.locale) }}
      </span>
    </div>
  </div>
</template>

<script>
import uuidv4 from 'uuid'
import SurveyItemMedia from '../../Survey/SurveyItemMedia/SurveyItemMedia'
export default {
  name: 'MissionSurveyResultsItemMedia',
  components: { SurveyItemMedia },
  props: {
    result: {
      type: Object,
      required: true
    },
    heatmapPoints: {
      type: Array,
      default: null
    },
    heatmapEnabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      id: null,
      expandable: false,
      expanded: false
    }
  },
  mounted() {
    this.id = uuidv4()
    this.$nextTick(function () {
      window.addEventListener('resize', this.onResize)
      this.onResize()
    })
  },
  beforeDestroy() {
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      const root = document.getElementById(this.id)
      const content = root.querySelector('.mission-survey-results-item-media-content')
      const contentInner = root.querySelector('.mission-survey-results-item-media-content-inner')

      this.expandable = content.offsetHeight < contentInner.offsetHeight
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyResultsItemMedia";
</style>
