<template>
  <div class="mission-overview-session">
    <p class="mission-overview-session-name">
      {{ formattedName }}
    </p>
    <p class="mission-overview-session-time border-left">
      {{ formattedTime }}
    </p>
    <div class="mission-overview-session-contact border-left">
      <MissionOverviewSessionIcon type="PHONE" :href="`tel:${session.phone}`" :disabled="!recruited || isSample" />
      <MissionOverviewSessionIcon type="EMAIL" :href="`mailto:${session.email}`" :disabled="!recruited || isSample" />
    </div>
    <div v-if="mission.type === MISSIONS.REMOTE" class="mission-overview-session-remote-call border-left">
      <p class="mission-overview-session-remote-call-button" :class="{ disabled: !recruited }">
        Start call
      </p>
    </div>
  </div>
</template>

<script>
import { MISSIONS } from '../../constants'
import MissionOverviewSessionIcon from '../MissionOverviewSessionIcon/MissionOverviewSessionIcon'
import { addMinutes, getAmPmTime } from '../../../utils/dateUtils'
export default {
  name: 'MissionOverviewSession',
  components: { MissionOverviewSessionIcon },
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
    recruited() {
      return this.session.testUser
    },
    formattedName() {
      if (!this.recruited) {
        return '-'
      }
      const { firstName, lastName } = this.session.testUser
      return `${firstName} ${lastName}`
    },
    formattedTime() {
      const start = new Date(this.session.startsAt)
      const end = new Date(start.getTime())
      addMinutes(end, this.mission.duration)

      return `${getAmPmTime(start)} - ${getAmPmTime(end)}`
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionOverviewSession";
</style>
