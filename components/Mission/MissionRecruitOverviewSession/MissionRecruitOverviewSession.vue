<template>
  <div class="mission-recruit-overview-session">
    <p class="mission-recruit-overview-session-name">
      {{ formattedName }}
    </p>
    <p class="mission-recruit-overview-session-time border-left">
      {{ formattedTime }}
    </p>
    <div class="mission-recruit-overview-session-contact border-left">
      <MissionRecruitOverviewSessionIcon type="PHONE" :href="phoneLink" :disabled="!recruited || isSample" />
      <MissionRecruitOverviewSessionIcon type="EMAIL" :href="emailLink" :disabled="!recruited || isSample" />
    </div>
    <div v-if="mission.type === MISSIONS.REMOTE" class="mission-recruit-overview-session-remote-call border-left">
      <p
        class="mission-recruit-overview-session-remote-call-button"
        :class="{ disabled: !recruited }"
        @click="startCall"
      >
        Start call
      </p>
    </div>
  </div>
</template>

<script>
import { MISSIONS } from '../../constants'
import { addMinutes, getAmPmTime } from '../../../utils/dateUtils'
import MissionRecruitOverviewSessionIcon from '../MissionRecruitOverviewSessionIcon/MissionRecruitOverviewSessionIcon'

export default {
  name: 'MissionRecruitOverviewSession',
  components: { MissionRecruitOverviewSessionIcon },
  props: {
    session: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      MISSIONS
    }
  },
  computed: {
    mission() {
      return this.$store.state.mission
    },
    isSample() {
      return this.$store.state.mission.id.startsWith('sample')
    },
    testUser() {
      return this.session.testUser
    },
    recruited() {
      return !!this.testUser
    },
    formattedName() {
      if (!this.recruited) {
        return '-'
      }
      const { firstName, lastName } = this.testUser
      return `${firstName} ${lastName}`
    },
    formattedTime() {
      const start = new Date(this.session.startsAt)
      const end = new Date(start.getTime())
      addMinutes(end, this.mission.duration)

      return `${getAmPmTime(start)} - ${getAmPmTime(end)}`
    },
    phoneLink() {
      if (!this.recruited) {
        return '#'
      }
      return `tel:${this.testUser.phone}`
    },
    emailLink() {
      if (!this.recruited) {
        return '#'
      }
      return `mailto:${this.testUser.email}`
    }
  },
  methods: {
    startCall() {
      if (!this.recruited) {
        return
      }
      this.$router.push(`/video-session/${this.session.id}/company`)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionRecruitOverviewSession";
</style>
