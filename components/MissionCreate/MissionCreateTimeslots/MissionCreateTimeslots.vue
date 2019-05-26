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
import { getAmPmTime, getLocaleDateString, getWeekDayName, groupByDay } from '../../../utils/dateUtils'
export default {
  name: 'MissionCreateTimeslots',
  components: { MissionCreateBox },
  computed: {
    s() {
      return this.$store.state.missionForm
    },
    sessionsByDay() {
      return groupByDay(this.s.sessions, 'start', 'sessions')
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
