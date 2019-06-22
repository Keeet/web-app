<template>
  <div class="mission-create-type">
    <Headline text="What do you want to do?" center />
    <div
      class="mission-create-type-items"
      data-aos="fade-up"
      data-aos-duration="700"
      data-aos-once="true"
      data-aos-delay="300"
    >
      <MissionCreateTypeItem :type="IN_HOUSE" @click.native="select(IN_HOUSE)" />
      <MissionCreateTypeItem :type="REMOTE" @click.native="select(REMOTE)" />
      <MissionCreateTypeItem :type="SURVEY" coming-soon />
      <MissionCreateTypeItem :type="USABILITY_LAB" coming-soon />
    </div>
  </div>
</template>

<script>
import { MISSIONS } from '../../constants'
import Headline from '../../_shared/Headline/Headline'
import MissionCreateTypeItem from '../MissionCreateTypeItem/MissionCreateTypeItem'
export default {
  name: 'MissionCreateType',
  components: { MissionCreateTypeItem, Headline },
  data() {
    const { IN_HOUSE, REMOTE, SURVEY, USABILITY_LAB } = MISSIONS
    return { IN_HOUSE, REMOTE, SURVEY, USABILITY_LAB }
  },
  methods: {
    select(type) {
      this.$store.commit('missionForm/setType', type)
      this.$store.commit('missionForm/nextStep')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateType";
</style>
