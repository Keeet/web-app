<template>
  <div class="mission-create">
    <ButtonCircle type="ARROW_LEFT" @click="$router.back()" />
    <MissionCreateType v-if="s.activeStep === 0" />
    <MissionCreateForm v-if="s.activeStep === 1" />
  </div>
</template>

<script>
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
import MissionCreateType from './MissionCreateType/MissionCreateType'
import MissionCreateForm from './MissionCreateForm/MissionCreateForm'

export default {
  name: 'MissionCreate',
  components: { MissionCreateForm, MissionCreateType, ButtonCircle },
  computed: {
    s() {
      return this.$store.state.missionForm
    }
  }
}
</script>

<style scoped lang="scss">
 @import "MissionCreate";
</style>
