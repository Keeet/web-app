<template>
  <div class="mission-create-timeslots">
    <MissionCreateBox
      v-for="(sessionByDay, x) in sessionsByDay"
      :key="x"
    >
      <div class="mission-create-timeslots-item">
        <div class="mission-create-timeslots-item-date">
          {{ getFormattedDate(sessionByDay.date) }}
        </div>
        <div class="mission-create-timeslots-item-sessions">
          <div
            v-for="(session, y) in sessionByDay.sessions"
            :key="y"
            class="mission-create-timeslots-item-sessions-item"
          >
            {{ getFormattedSessionDate(session.start, session.end) }}
          </div>
        </div>
      </div>
    </MissionCreateBox>
  </div>
</template>

<script>
import MissionCreateBox from '../MissionCreateBox/MissionCreateBox'
import { getAmPmTime, getLocaleDateString, getWeekDayName, isSameDay } from '../../../utils/dateUtils'
export default {
  name: 'MissionCreateTimeslots',
  components: { MissionCreateBox },
  computed: {
    s() {
      return this.$store.state.missionForm
    },
    sessionsByDay() {
      const sessions = this.s.sessions
        .slice()
        .sort((a, b) => a.start > b.start ? 1 : -1)

      const sessionsByDay = []
      let currentDayDate = null
      sessions.forEach((session) => {
        if (!currentDayDate || !isSameDay(session.start, currentDayDate)) {
          sessionsByDay.push({
            date: session.start,
            sessions: [session]
          })
          currentDayDate = session.start
        } else {
          sessionsByDay.slice(-1)[0].sessions.push(session)
        }
      })
      return sessionsByDay
    }
  },
  methods: {
    getFormattedDate(date) {
      return `${getWeekDayName(date)}, ${getLocaleDateString(date)}`
    },
    getFormattedSessionDate(start, end) {
      return `${getAmPmTime(start)} - ${getAmPmTime(end)}`
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateTimeslots";
</style>
