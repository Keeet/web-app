<template>
  <div class="mission-create">
    <ButtonCircle type="ARROW_LEFT" @click="$router.back()" />
    <div class="mission-create-body">
      <Headline text="What do you want to do?" center />
      <div class="mission-create-types">
        <MissionCreateType :type="MISSIONS.IN_HOUSE" />
        <MissionCreateType :type="MISSIONS.REMOTE" />
        <MissionCreateType :type="MISSIONS.SURVEY" coming-soon />
        <MissionCreateType :type="MISSIONS.USABILITY_LAB" coming-soon />
      </div>
    </div>
  </div>
</template>

<script>
import { MISSIONS } from '../constants'
import Headline from '../_shared/Headline/Headline'
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
import MissionCreateType from './MissionCreateType/MissionCreateType'

export default {
  name: 'MissionCreate',
  components: { ButtonCircle, Headline, MissionCreateType },
  data() {
    return { MISSIONS }
  }
}
</script>

<style scoped lang="scss">
 @import "MissionCreate";
</style>
