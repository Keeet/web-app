<template>
  <div
    class="mission-create-recruit-form-duration-item"
    :class="{ active }"
    @click="$store.commit('missionForm/setDuration', duration)"
  >
    {{ duration }}
  </div>
</template>

<script>
export default {
  name: 'MissionCreateRecruitFormDurationItem',
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
  @import "MissionCreateRecruitFormDurationItem";
</style>
