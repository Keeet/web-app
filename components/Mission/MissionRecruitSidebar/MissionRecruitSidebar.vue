<template>
  <MissionSidebar>
    <div class="mission-recruit-sidebar">
      <MissionCountProgress
        title="RECRUITED"
        :count-current="recruitedCount"
        :count-total="mission.sessions.length"
      />
      <SidebarLeftHeadline text="Target audience" />
      <MissionRecruitSidebarLine type="PERSONA" grey-bg>
        <MissionPersonaCriteriaTextBoxes :persona="mission.recruitmentOrders[0].demographicData" />
      </MissionRecruitSidebarLine>
      <SidebarLeftHeadline text="General Information" />
      <MissionRecruitSidebarLine v-if="isInHouse" type="LOCATION" :grey-bg="isInHouse">
        <p>{{ mission.street }}, {{ mission.houseNumber }}</p>
        <p>{{ mission.zipCode }} {{ mission.city }}</p>
      </MissionRecruitSidebarLine>
      <MissionRecruitSidebarLine type="DURATION" :grey-bg="!isInHouse">
        {{ mission.duration }} min
      </MissionRecruitSidebarLine>
      <MissionRecruitSidebarLine type="PARTICIPANTS" :grey-bg="isInHouse">
        {{ mission.sessions.length }} test users
      </MissionRecruitSidebarLine>
    </div>
  </MissionSidebar>
</template>

<script>
import SidebarLeftHeadline from '../../_shared/SidebarLeftHeadline/SidebarLeftHeadline'
import { LANGUAGE_LABELS, MISSIONS } from '../../constants'
import MissionRecruitSidebarLine from '../MissionRecruitSidebarLine/MissionRecruitSidebarLine'
import MissionSidebar from '../MissionSidebar/MissionSidebar'
import MissionPersonaCriteriaTextBoxes
  from '../../_shared/MissionPersonaCriteriaTextBoxes/MissionPersonaCriteriaTextBoxes'
import MissionCountProgress from '../MissionCountProgress/MissionCountProgress'

export default {
  name: 'MissionRecruitSidebar',
  components: { MissionCountProgress, MissionPersonaCriteriaTextBoxes, MissionSidebar, MissionRecruitSidebarLine, SidebarLeftHeadline },
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
