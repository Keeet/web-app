<template>
  <div class="mission-create-recruit-form-duration">
    <MissionCreateRecruitFormDurationItem
      v-for="(duration, x) in PRESETS"
      :key="x"
      :duration="duration"
      :active="duration === s.recruit.duration"
      @click="$store.commit('missionFormRecruit/setDuration', duration)"
    />
    <div class="mission-create-recruit-form-duration-input">
      <Input
        :value="customDuration"
        mutation="missionFormRecruit/setDuration"
        placeholder="e.g. 120"
        :error="error"
      />
    </div>
  </div>
</template>

<script>
import MissionCreateRecruitFormDurationItem from '../MissionCreateRecruitFormDurationItem/MissionCreateRecruitFormDurationItem'
import Input from '../../_shared/Input/Input'

const PRESETS = [30, 45, 60, 90]

export default {
  name: 'MissionCreateRecruitFormDuration',
  components: { Input, MissionCreateRecruitFormDurationItem },
  props: {
    error: {
      type: String,
      default: null
    }
  },
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
    customDuration() {
      if (this.PRESETS.includes(this.s.recruit.duration)) {
        return ''
      } else {
        return this.s.recruit.duration
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitFormDuration";
</style>
