<template>
  <div
    class="mission-create-form-duration-item"
    :class="{ active }"
    @click="$store.commit('missionForm/setDuration', duration)"
  >
    {{ duration }}
  </div>
</template>

<script>
export default {
  name: 'MissionCreateFormDurationItem',
  props: {
    duration: {
      type: Number,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateFormDurationItem";
</style>
