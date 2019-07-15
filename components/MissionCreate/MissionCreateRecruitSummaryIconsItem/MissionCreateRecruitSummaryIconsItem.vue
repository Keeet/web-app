<template>
  <div class="mission-create-recruit-summary-icons-item">
    <div class="mission-create-recruit-summary-icons-item-icon">
      <IconLocation v-if="type === TYPES.LOCATION" />
      <IconStopWatch v-if="type === TYPES.DURATION" />
      <IconProfile v-if="type === TYPES.PARTICIPANTS" />
    </div>
    <div class="mission-create-recruit-summary-icons-item-body">
      <p v-if="text">
        {{ text }}
      </p>
      <slot v-if="$slots.default" />
    </div>
  </div>
</template>

<script>
const TYPES = {
  LOCATION: 'LOCATION',
  DURATION: 'DURATION',
  PARTICIPANTS: 'PARTICIPANTS'
}

export default {
  name: 'MissionCreateRecruitSummaryIconsItem',
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
    text: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      TYPES
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitSummaryIconsItem";
</style>
