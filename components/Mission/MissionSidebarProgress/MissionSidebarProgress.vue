<template>
  <div class="mission-sidebar-progress">
    <p class="mission-sidebar-progress-title">
      {{ title }}
    </p>
    <p class="mission-sidebar-progress-count">
      <span class="mission-sidebar-progress-count-current">
        {{ countCurrent }}
      </span>
      <span class="mission-sidebar-progress-count-total">
        out of {{ countTotal }}
      </span>
    </p>
    <div class="mission-sidebar-progress-progress">
      <div
        class="mission-sidebar-progress-progress-done"
        :class="{ showProgress, noAnimation: missionPage.disableAnimation }"
        :style="{ width: (countCurrent / countTotal * 100) + '%' }"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MissionSidebarProgress',
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
      required: true
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
