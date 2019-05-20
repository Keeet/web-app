<template>
  <div class="mission-create-form-duration">
    <MissionCreateFormDurationItem
      v-for="(duration, x) in PRESETS"
      :key="x"
      :duration="duration"
      :active="duration === s.duration"
      @click="$store.commit('missionForm/setDuration', duration)"
    />
    <div class="mission-create-form-duration-input">
      <Input
        :value="customDuration"
        mutation="missionForm/setDuration"
        placeholder="e.g. 120"
        :error="error"
      />
    </div>
  </div>
</template>

<script>
import MissionCreateFormDurationItem from '../MissionCreateFormDurationItem/MissionCreateFormDurationItem'
import Input from '../../_shared/Input/Input'

const PRESETS = [30, 45, 60, 90]

export default {
  name: 'MissionCreateFormDuration',
  components: { Input, MissionCreateFormDurationItem },
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
      return this.$store.state.missionForm
    },
    customDuration() {
      if (this.PRESETS.includes(this.s.duration)) {
        return ''
      } else {
        return this.s.duration
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateFormDuration";
</style>
