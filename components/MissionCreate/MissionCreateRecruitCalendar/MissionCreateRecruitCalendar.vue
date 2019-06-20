<template>
  <div class="mission-create-recruit-calendar">
    <MissionCreateRecruitCalendarPlugin />
    <div class="mission-create-recruit-calendar-menu">
      <div class="mission-create-recruit-calendar-menu-count" :class="{ valid }">
        <p>{{ s.recruit.sessions.length }} of {{ s.recruit.nbParticipants }} time slots selected</p>
        <IconCheck v-if="valid" />
      </div>
      <span
        class="mission-create-recruit-calendar-menu-reset"
        :class="{ disabled: s.recruit.sessions.length === 0 }"
        @click="$store.commit('missionFormRecruit/resetSessions')"
      >reset</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MissionCreateRecruitCalendar',
  computed: {
    s() {
      const { missionForm, missionFormRecruit } = this.$store.state
      return {
        ...missionForm,
        recruit: missionFormRecruit
      }
    },
    valid() {
      return this.s.recruit.sessions.length >= parseInt(this.s.recruit.nbParticipants)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitCalendar";
</style>
