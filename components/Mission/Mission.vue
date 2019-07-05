<template>
  <MissionRecruit v-if="[IN_HOUSE, REMOTE].includes(mission.type)" />
  <div v-else :style="{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }">
    <nuxt-link :to="`/survey/${mission.id}`">
      <ButtonText text="GO TO SURVEY" />
    </nuxt-link>
  </div>
</template>

<script>
import { MISSIONS } from '../constants'
import ButtonText from '../_shared/ButtonText/ButtonText'
import MissionRecruit from './MissionRecruit/MissionRecruit'

export default {
  name: 'Mission',
  components: {
    MissionRecruit,
    ButtonText
  },
  data() {
    return {
      ...MISSIONS
    }
  },
  computed: {
    mission() {
      return this.$store.state.mission
    }
  }
}
</script>
