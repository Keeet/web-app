<template>
  <div class="mission-recruit-overview">
    <div
      v-for="(sessionGroup, x) in sessionsByDay"
      :key="x"
      class="mission-recruit-overview-day"
    >
      <div
        data-aos="fade-up"
        data-aos-duration="700"
        :data-aos-delay="x * 200"
        data-aos-once="true"
        data-aos-anchor=".mission-recruit-overview"
      >
        <p class="mission-recruit-overview-headline">
          {{ getHeadlineDate(sessionGroup.sessions[0].startsAt) }}
        </p>
        <MissionRecruitOverviewSession
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
import MissionRecruitOverviewSession from '../MissionRecruitOverviewSession/MissionRecruitOverviewSession'

export default {
  name: 'MissionRecruitOverview',
  components: { MissionRecruitOverviewSession },
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
      return groupByDay(sessionsWithDeserializedDate, 'startsAt', 'sessions')
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
  @import "MissionRecruitOverview";
</style>
