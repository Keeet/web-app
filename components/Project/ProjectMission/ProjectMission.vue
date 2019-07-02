<template>
  <div
    data-aos="fade-up"
    data-aos-duration="700"
    :data-aos-delay="aosDelay"
    data-aos-once="true"
    data-aos-anchor="body"
  >
    <div class="project-mission">
      <div class="project-mission-icon" :class="mission.type" @click="openMission">
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
      <div class="project-mission-info" @click="openMission">
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
        <ProjectMissionSection headline="Description" :type="mission.type" is-description no-border>
          <div class="project-mission-description">
            <no-ssr>
              <ellipsis
                :text="descriptionFormatted"
                :line-num="3"
                font-size="18px"
                font-family="Roboto"
                left="..."
                tag-name="span"
              />
            </no-ssr>
          </div>
        </ProjectMissionSection>
      </div>
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
    },
    aosDelay: {
      type: Number,
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
      if (!this.description) {
        return '-'
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
  },
  methods: {
    openMission() {
      this.$router.push(`/missions/${this.mission.id}`)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "ProjectMission";
</style>
