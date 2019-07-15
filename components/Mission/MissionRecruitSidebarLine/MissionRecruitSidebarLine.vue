<template>
  <div class="mission-recruit-sidebar-line" :class="{ greyBg }">
    <div v-if="type !== TYPES.PERSONA" class="mission-recruit-sidebar-line-icon" :class="type">
      <IconLocation v-if="type === TYPES.LOCATION" />
      <IconStopWatch v-if="type === TYPES.DURATION" />
      <IconProfile v-if="type === TYPES.PARTICIPANTS" />
    </div>
    <div class="mission-recruit-sidebar-line-text">
      <slot />
    </div>
  </div>
</template>

<script>
const TYPES = {
  PERSONA: 'PERSONA',
  LOCATION: 'LOCATION',
  LANGUAGE: 'LANGUAGE',
  DURATION: 'DURATION',
  PARTICIPANTS: 'PARTICIPANTS'
}

export default {
  name: 'MissionRecruitSidebarLine',
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.keys(TYPES).includes(value)
    },
    value: {
      type: String,
      default: null
    },
    greyBg: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { TYPES }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionRecruitSidebarLine";
</style>
