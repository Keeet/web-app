<template>
  <div class="mission-create-recruit-form-duration">
    <MissionCreateRecruitFormDurationItem
      v-for="(presetDuration, x) in presets"
      :key="x"
      :duration="presetDuration"
      :active="presetDuration === s.recruit.duration"
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
      const { missionForm, missionFormRecruit } = this.$store.state
      return {
        ...missionForm,
        recruit: missionFormRecruit
      }
    },
    presets() {
      return PRESETS[this.s.type]
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitFormDuration";
</style>
