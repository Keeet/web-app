<template>
  <div class="project-mission-section" :class="{ noBorder, noShrink, grow }">
    <p v-if="headline" class="project-mission-section-headline" :class="type">
      {{ headline }}
    </p>
    <div class="project-mission-section-content" :class="{ noHeadline: !headline }">
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
      default: null
    },
    type: {
      type: String,
      required: true,
      validator: value => Object.keys(MISSIONS).includes(value)
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    grow: {
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
