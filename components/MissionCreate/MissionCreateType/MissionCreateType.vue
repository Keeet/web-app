<template>
  <div class="mission-create-type" :class="{ comingSoon }">
    <div class="mission-create-type-icon" :class="type">
      <IconPencil v-if="type === MISSIONS.IN_HOUSE" />
      <IconPencil v-if="type === MISSIONS.REMOTE" />
      <IconPencil v-if="type === MISSIONS.SURVEY" />
      <IconPencil v-if="type === MISSIONS.USABILITY_LAB" />
    </div>
    <p class="mission-create-type-title">
      {{ MISSION_LABELS[type] }}
    </p>
    <p v-if="comingSoon" class="mission-create-type-coming-soon">
      Coming soon
    </p>
  </div>
</template>

<script>
import { MISSIONS, MISSION_LABELS } from '../../constants'

export default {
  name: 'MissionCreateType',
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.values(MISSIONS).includes(value)
    },
    comingSoon: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { MISSIONS, MISSION_LABELS }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateType";
</style>
