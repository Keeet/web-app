<template>
  <div class="mission-create-recruit-timeslots">
    <MissionCreateBox
      v-for="(sessionByDay, x) in sessionsByDay"
      :key="x"
    >
      <div class="mission-create-recruit-timeslots-item">
        <div class="mission-create-recruit-timeslots-item-date">
          {{ getFormattedDate(sessionByDay.date) }}
        </div>
        <div class="mission-create-recruit-timeslots-item-sessions">
          <div
            v-for="(session, y) in sessionByDay.sessions"
            :key="y"
            class="mission-create-recruit-timeslots-item-sessions-item"
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
  name: 'MissionCreateRecruitTimeslots',
  components: { MissionCreateBox },
  computed: {
    s() {
      const { missionForm, missionFormRecruit } = this.$store.state
      return {
        ...missionForm,
        recruit: missionFormRecruit
      }
    },
    sessionsByDay() {
      return groupByDay(this.s.recruit.sessions, 'start', 'sessions')
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
  @import "MissionCreateRecruitTimeslots";
</style>
