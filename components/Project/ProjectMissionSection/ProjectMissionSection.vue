<template>
  <div class="project-mission-section" :class="{ noBorder, noShrink }">
    <p class="project-mission-section-headline" :class="type">
      {{ headline }}
    </p>
    <div class="project-mission-section-content">
      <slot />
    </div>
  </div>
</template>

<script>
import { MISSIONS } from '../../constants'

export default {
  name: 'ProjectMissionSection',
  props: {
    headline: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator: value => Object.values(MISSIONS).includes(value)
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    noShrink: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "ProjectMissionSection";
</style>
