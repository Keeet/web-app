<template>
  <div class="mission-create-type">
    <Headline :text="headline" center />
    <div
      class="mission-create-type-items"
      data-aos="fade-up"
      data-aos-duration="700"
      data-aos-once="true"
      data-aos-delay="300"
    >
      <MissionCreateTypeItem :type="IN_HOUSE" @click.native="select(IN_HOUSE)" />
      <MissionCreateTypeItem :type="REMOTE" @click.native="select(REMOTE)" />
      <MissionCreateTypeItem :type="SURVEY" @click.native="select(SURVEY)" />
      <MissionCreateTypeItem :type="USABILITY_LAB" @click.native="select(USABILITY_LAB)" />
    </div>
  </div>
</template>

<script>
import { MISSION_LABELS, MISSIONS } from '../../constants'
import Headline from '../../_shared/Headline/Headline'
import MissionCreateTypeItem from '../MissionCreateTypeItem/MissionCreateTypeItem'

export default {
  name: 'MissionCreateType',
  components: { MissionCreateTypeItem, Headline },
  data() {
    const { IN_HOUSE, REMOTE, SURVEY, USABILITY_LAB } = MISSIONS
    return { IN_HOUSE, REMOTE, SURVEY, USABILITY_LAB }
  },
  computed: {
    s() {
      return this.$store.state.missionForm
    },
    headline() {
      return this.s.projectFirstMission
        ? 'Create your first mission'
        : 'What do you want to do?'
    }
  },
  methods: {
    select(type) {
      // switch mission type OR select mission type for the first time
      if (this.s.type !== type) {
        this.$store.commit('missionForm/resetForm')
        this.$store.commit('missionFormRecruit/init', {
          missionType: type
        })
        this.$store.commit('missionFormSurvey/init')
        this.$store.commit('missionFormPersona/init')
        this.$store.commit('missionForm/setTitlePlaceholder', `${MISSION_LABELS[type]} #${this.getCountOfExistingMissionsByType(type) + 1}`)
      }
      this.$store.commit('missionForm/setType', type)
      this.$store.commit('missionForm/hideErrors')
      this.$store.commit('missionForm/nextStep')
    },
    getCountOfExistingMissionsByType(type) {
      return this.$store.state.project.missions.filter(mission => mission.type === type).length
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateType";
</style>
