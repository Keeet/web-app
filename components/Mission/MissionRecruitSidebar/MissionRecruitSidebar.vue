<template>
  <MissionSidebar>
    <MissionSidebarProgress
      title="RECRUITED"
      :count-current="recruitedCount"
      :count-total="mission.sessions.length"
    />
    <SidebarLeftHeadline text="Persona" />
    <MissionRecruitSidebarLine type="PERSONA" :value="mission.persona.icon" grey-bg>
      {{ mission.persona.name }}
    </MissionRecruitSidebarLine>
    <SidebarLeftHeadline text="General Information" />
    <MissionRecruitSidebarLine v-if="isInHouse" type="LOCATION" :grey-bg="isInHouse">
      <p>{{ mission.street }}, {{ mission.houseNumber }}</p>
      <p>{{ mission.zipCode }} {{ mission.city }}</p>
    </MissionRecruitSidebarLine>
    <MissionRecruitSidebarLine type="LANGUAGE" :value="mission.language" :grey-bg="!isInHouse">
      {{ LANGUAGE_LABELS[mission.language] }}
    </MissionRecruitSidebarLine>
    <MissionRecruitSidebarLine type="DURATION" :grey-bg="isInHouse">
      {{ mission.duration }} min
    </MissionRecruitSidebarLine>
    <MissionRecruitSidebarLine type="NB_PARTICIPANTS" :grey-bg="!isInHouse">
      {{ mission.sessions.length }} test users
    </MissionRecruitSidebarLine>
  </MissionSidebar>
</template>

<script>
import SidebarLeftHeadline from '../../_shared/SidebarLeftHeadline/SidebarLeftHeadline'
import { LANGUAGE_LABELS, MISSIONS } from '../../constants'
import MissionRecruitSidebarLine from '../MissionRecruitSidebarLine/MissionRecruitSidebarLine'
import MissionSidebarProgress from '../MissionSidebarProgress/MissionSidebarProgress'
import MissionSidebar from '../MissionSidebar/MissionSidebar'

export default {
  name: 'MissionRecruitSidebar',
  components: { MissionSidebar, MissionSidebarProgress, MissionRecruitSidebarLine, SidebarLeftHeadline },
  data() {
    return { showProgress: false, LANGUAGE_LABELS }
  },
  computed: {
    mission() {
      return this.$store.state.mission
    },
    recruitedCount() {
      return this.mission.sessions.filter(session => !!session.testUser).length
    },
    isInHouse() {
      return this.mission.type === MISSIONS.IN_HOUSE
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionRecruitSidebar";
</style>
