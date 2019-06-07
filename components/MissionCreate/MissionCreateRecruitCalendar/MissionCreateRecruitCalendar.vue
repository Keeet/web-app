<template>
  <div class="mission-create-recruit-calendar">
    <MissionCreateRecruitCalendarPlugin />
    <div class="mission-create-recruit-calendar-menu">
      <div class="mission-create-recruit-calendar-menu-count" :class="{ valid }">
        <p>{{ s.sessions.length }} of {{ s.nbParticipants }} time slots selected</p>
        <IconCheck v-if="valid" />
      </div>
      <span
        class="mission-create-recruit-calendar-menu-reset"
        :class="{ disabled: s.sessions.length === 0 }"
        @click="$store.commit('missionForm/resetSessions')"
      >reset</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MissionCreateRecruitCalendar',
  computed: {
    s() {
      return this.$store.state.missionForm
    },
    valid() {
      return this.s.sessions.length >= this.s.nbParticipants
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitCalendar";
</style>
