<template>
  <SidebarLeft
    :cancel-path="`/projects/${mission.projectId}`"
    :title="mission.title"
    :description="description"
    :disable-edit-head="isSample"
    :disable-animation="missionPage.disableAnimation"
    @editHead="editMissionMetadata"
  >
    <div class="mission-sidebar-recruited">
      <p class="mission-sidebar-recruited-title">
        RECRUITED
      </p>
      <p class="mission-sidebar-recruited-count">
        <span class="mission-sidebar-recruited-count-current">
          {{ recruitedCount }}
        </span>
        <span class="mission-sidebar-recruited-count-total">
          out of {{ mission.sessions.length }}
        </span>
      </p>
      <div class="mission-sidebar-recruited-progress">
        <div
          class="mission-sidebar-recruited-progress-done"
          :class="{ showProgress, noAnimation: missionPage.disableAnimation }"
          :style="{ width: (recruitedCount / mission.sessions.length * 100) + '%' }"
        />
      </div>
    </div>
    <SidebarLeftHeadline text="Persona" />
    <MissionSidebarLine type="PERSONA" :value="mission.persona.icon" grey-bg>
      {{ mission.persona.name }}
    </MissionSidebarLine>
    <SidebarLeftHeadline text="General Information" />
    <MissionSidebarLine v-if="isInHouse" type="LOCATION" :grey-bg="isInHouse">
      <p>{{ mission.street }}, {{ mission.houseNumber }}</p>
      <p>{{ mission.zipCode }} {{ mission.city }}</p>
    </MissionSidebarLine>
    <MissionSidebarLine type="LANGUAGE" :value="mission.language" :grey-bg="!isInHouse">
      {{ LANGUAGE_LABELS[mission.language] }}
    </MissionSidebarLine>
    <MissionSidebarLine type="DURATION" :grey-bg="isInHouse">
      {{ mission.duration }} min
    </MissionSidebarLine>
    <MissionSidebarLine type="NB_PARTICIPANTS" :grey-bg="!isInHouse">
      {{ mission.sessions.length }} test users
    </MissionSidebarLine>
  </SidebarLeft>
</template>

<script>
import SidebarLeft from '../../_shared/SidebarLeft/SidebarLeft'
import SidebarLeftHeadline from '../../_shared/SidebarLeftHeadline/SidebarLeftHeadline'
import MissionSidebarLine from '../MissionSidebarLine/MissionSidebarLine'

import { LANGUAGE_LABELS, MISSIONS } from '../../constants'

export default {
  name: 'MissionSidebar',
  components: { MissionSidebarLine, SidebarLeftHeadline, SidebarLeft },
  data() {
    return { showProgress: false, LANGUAGE_LABELS }
  },
  computed: {
    mission() {
      return this.$store.state.mission
    },
    missionPage() {
      return this.$store.state.missionPage
    },
    recruitedCount() {
      return this.mission.sessions.filter(session => !!session.testUser).length
    },
    isInHouse() {
      return this.mission.type === MISSIONS.IN_HOUSE
    },
    isSample() {
      return this.$store.state.mission.id.startsWith('sample')
    },
    description() {
      const descr = this.mission.description
      if (!descr) {
        return 'Enter you mission description here to explain what you want to achieve with this research session...'
      }
      return descr.replace(/\n/g, '<br />')
    }
  },
  mounted() {
    if (this.missionPage.disableAnimation) {
      this.showProgress = true
      return
    }
    window.setTimeout(() => {
      this.showProgress = true
    }, 2000)
  },
  methods: {
    editMissionMetadata() {
      this.$store.commit('missionMetadataForm/init', this.mission)
      this.$store.commit('missionMetadataForm/setOverlayOpened', true)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSidebar";
</style>
