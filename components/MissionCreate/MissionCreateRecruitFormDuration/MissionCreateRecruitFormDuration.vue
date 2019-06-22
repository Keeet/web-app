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
        :error="durationError"
        dispatch-error="missionForm/handleValidationError"
      />
    </div>
  </div>
</template>

<script>
import MissionCreateRecruitFormDurationItem from '../MissionCreateRecruitFormDurationItem/MissionCreateRecruitFormDurationItem'
import Input from '../../_shared/Input/Input'
import { isNum } from '../../../utils/stringUtils'

const PRESETS = [30, 45, 60, 90]

export default {
  name: 'MissionCreateRecruitFormDuration',
  components: { Input, MissionCreateRecruitFormDurationItem },
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
    },
    durationError() {
      if (!isNum(this.s.recruit.duration)) {
        return 'must be a number'
      }
      if (parseInt(this.s.recruit.duration) < 30) {
        return 'must be bigger than 30'
      }
      return null
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitFormDuration";
</style>
