<template>
  <div class="mission-create-recruit-form-duration">
    <MissionCreateRecruitFormDurationItem
      v-for="(presetDuration, x) in presets"
      :key="x"
      :duration="presetDuration"
      :active="presetDuration === duration"
      @click="$store.commit('missionFormRecruit/setDuration', presetDuration)"
    />
  </div>
</template>

<script>
import MissionCreateRecruitFormDurationItem from '../MissionCreateRecruitFormDurationItem/MissionCreateRecruitFormDurationItem'

const PRESETS = {
  IN_HOUSE: [45, 60, 90],
  REMOTE: [30, 45, 60, 90]
}

export default {
  name: 'MissionCreateRecruitFormDuration',
  components: { MissionCreateRecruitFormDurationItem },
  data() {
    return { PRESETS }
  },
  computed: {
    s() {
      return this.$store.state.missionForm
    },
    presets() {
      return PRESETS[this.s.type]
    },
    duration() {
      return this.$store.getters['missionFormRecruit/duration']
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitFormDuration";
</style>
