<template>
  <div class="project-mission">
    <div class="project-mission-icon" :class="mission.type">
      <div class="project-mission-icon-inner">
        <IconMissionInHouse v-if="mission.type === IN_HOUSE" />
        <IconMissionRemote v-if="mission.type === REMOTE" />
        <IconMissionSurvey v-if="mission.type === SURVEY" />
        <IconMissionUsabilityLab v-if="mission.type === USABILITY_LAB" />
        <p class="project-mission-icon-text">
          {{ MISSION_LABELS[mission.type] }}
        </p>
      </div>
    </div>
    <div class="project-mission-info">
      <div class="project-mission-info-label">
        <p class="project-mission-info-label-text">
          Info
        </p>
      </div>
      <ProjectMissionSection headline="Date" :type="mission.type">
        <p class="project-mission-date">
          {{ date }}
        </p>
      </ProjectMissionSection>
      <ProjectMissionSection headline="Owner" :type="mission.type" no-shrink>
        <div class="project-mission-owner">
          <img class="project-mission-owner-img" :src="mission.owner.profileImage">
          <p class="project-mission-owner-name">
            {{ mission.owner.firstName }} {{ mission.owner.lastName }}
          </p>
        </div>
      </ProjectMissionSection>
      <ProjectMissionSection headline="Description" :type="mission.type" no-border>
        <p class="project-mission-description">
          {{ descriptionFormatted }}
        </p>
      </ProjectMissionSection>
    </div>
  </div>
</template>

<script>
import { getLocaleDateString } from '../../../utils/dateUtils'
import { MISSIONS, MISSION_LABELS } from '../../constants'
import ProjectMissionSection from '../ProjectMissionSection/ProjectMissionSection'

export default {
  name: 'ProjectMission',
  components: { ProjectMissionSection },
  props: {
    mission: {
      type: Object,
      required: true
    }
  },
  data() {
    const { IN_HOUSE, REMOTE, SURVEY, USABILITY_LAB } = MISSIONS
    return {
      MISSION_LABELS,
      IN_HOUSE,
      REMOTE,
      SURVEY,
      USABILITY_LAB
    }
  },
  computed: {
    description() {
      return this.mission.description
    },
    descriptionFormatted() {
      const maxLength = 100
      if (this.description.length > maxLength) {
        return `${this.description.substr(0, maxLength)}...`
      }
      return this.description
    },
    hasConductingDate() {
      return [this.IN_HOUSE, this.REMOTE].includes(this.mission.type)
    },
    date() {
      if (this.hasConductingDate) {
        const start = new Date(this.mission.startDate)
        return getLocaleDateString(start)
      }
      return getLocaleDateString(new Date(this.mission.createdAt))
    }
  }
}
</script>

<style scoped lang="scss">
  @import "ProjectMission";
</style>
