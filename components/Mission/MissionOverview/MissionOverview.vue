<template>
  <div class="mission-overview">
    <div
      v-for="(sessionGroup, x) in sessionsByDay"
      :key="x"
      class="mission-overview-day"
    >
      <div
        data-aos="fade-up"
        data-aos-duration="800"
        :data-aos-delay="x * 400"
        data-aos-once="true"
        data-aos-anchor=".mission-overview"
      >
        <p class="mission-overview-headline">
          {{ getHeadlineDate(sessionGroup.sessions[0].startsAt) }}
        </p>
        <MissionOverviewSession
          v-for="(session, y) in sessionGroup.sessions"
          :key="y"
          :session="session"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getMonthName, groupByDay } from '../../../utils/dateUtils'
import MissionOverviewSession from '../MissionOverviewSession/MissionOverviewSession'

export default {
  name: 'MissionOverview',
  components: { MissionOverviewSession },
  computed: {
    mission() {
      return this.$store.state.mission
    },
    sessionsByDay() {
      const sessionsWithDeserializedDate = this.mission.sessions.map((session) => {
        return {
          ...session,
          startsAt: new Date(session.startsAt)
        }
      })
      return groupByDay(sessionsWithDeserializedDate, 'startsAt', 'sessions', true)
    }
  },
  methods: {
    getHeadlineDate(date) {
      return `${getMonthName(date)} ${date.getDate()}`
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionOverview";
</style>
