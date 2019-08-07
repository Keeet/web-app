<template>
  <div class="mission-count-progress">
    <MissionCount
      :title="title"
      :text-large="countCurrent"
      :text-small="`out of ${countTotalFormatted}`"
    />
    <div class="mission-count-progress-bar">
      <div
        class="mission-count-progress-bar-done"
        :class="{ showProgress, noAnimation: missionPage.disableAnimation }"
        :style="{ width }"
      />
    </div>
  </div>
</template>

<script>
import { decodeHTML } from '../../../utils/htmlUtils'
import MissionCount from '../MissionCount/MissionCount'

export default {
  name: 'MissionCountProgress',
  components: { MissionCount },
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
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionCountProgress";
</style>
