<template>
  <MissionSidebar>
    <div class="mission-recruit-sidebar">
      <MissionCountProgress
        :title="$t('mission.sidebar.recruit.recruitedLabel', $store.state.locale)"
        :count-current="recruitedCount"
        :count-total="participants"
      />
      <SidebarLeftHeadline :text="$t('mission.sidebar.recruit.targetAudience', $store.state.locale)" />
      <MissionRecruitSidebarLine type="PERSONA" grey-bg>
        <MissionPersonaCriteriaTextBoxes :persona="persona" />
      </MissionRecruitSidebarLine>
      <SidebarLeftHeadline :text="$t('mission.sidebar.recruit.generalInformation', $store.state.locale)" />
      <MissionRecruitSidebarLine v-if="isInHouse" type="LOCATION" :grey-bg="isInHouse">
        <p>{{ mission.street }}, {{ mission.houseNumber }}</p>
        <p>{{ mission.zipCode }} {{ mission.city }}</p>
      </MissionRecruitSidebarLine>
      <MissionRecruitSidebarLine type="DURATION" :grey-bg="!isInHouse">
        {{ $t('mission.sidebar.recruit.duration', $store.state.locale, { duration: mission.duration }) }}
      </MissionRecruitSidebarLine>
      <MissionRecruitSidebarLine type="PARTICIPANTS" :grey-bg="isInHouse">
        {{ $t('mission.sidebar.recruit.participants', $store.state.locale, { count: participants }) }}
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
    },
    participants() {
      return this.mission.recruitmentOrders[0].participants
    },
    persona() {
      const orders = this.mission.recruitmentOrders[0]
      return {
        ...orders.demographicData,
        specialCriteria: orders.specialCriteria
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionRecruitSidebar";
</style>
