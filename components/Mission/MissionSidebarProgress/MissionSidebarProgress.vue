<template>
  <div class="mission-sidebar-progress">
    <MissionSurveySidebarCount
      :title="title"
      :text-large="countCurrent"
      :text-small="`out of ${countTotalFormatted}`"
    />
    <div class="mission-sidebar-progress-progress">
      <div
        class="mission-sidebar-progress-progress-done"
        :class="{ showProgress, noAnimation: missionPage.disableAnimation }"
        :style="{ width }"
      />
    </div>
  </div>
</template>

<script>
import { decodeHTML } from '../../../utils/htmlUtils'
import MissionSurveySidebarCount from '../MissionSurveySidebarCount/MissionSurveySidebarCount'

export default {
  name: 'MissionSidebarProgress',
  components: { MissionSurveySidebarCount },
  props: {
    title: {
      type: String,
      required: true
    },
    countCurrent: {
      type: Number,
      required: true
    },
    countTotal: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      showProgress: false
    }
  },
  computed: {
    missionPage() {
      return this.$store.state.missionPage
    },
    countTotalFormatted() {
      if (this.countTotal === null && process.client) {
        return decodeHTML('&infin;')
      }
      return this.countTotal
    },
    width() {
      if (this.countTotal === null) {
        return null
      }
      return (this.countCurrent / this.countTotal * 100) + '%'
    }
  },
  mounted() {
    if (this.missionPage.disableAnimation) {
      this.showProgress = true
      return
    }
    window.setTimeout(() => {
      this.showProgress = true
    }, 2000)
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionSidebarProgress";
</style>
