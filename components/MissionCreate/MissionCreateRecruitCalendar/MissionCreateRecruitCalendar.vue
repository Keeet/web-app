<template>
  <div class="mission-create-recruit-calendar">
    <MissionCreateRecruitCalendarPlugin />
    <div class="mission-create-recruit-calendar-menu">
      <div :id="validationId" class="mission-create-recruit-calendar-menu-count" :class="{ valid: !validationError }">
        <p>{{ s.recruit.sessions.length }} of {{ s.recruit.nbParticipants }} time slots selected</p>
        <IconCheck v-if="!validationError" />
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
import uuidv4 from 'uuid/v4'
export default {
  name: 'MissionCreateRecruitCalendar',
  data() {
    return { validationId: null }
  },
  computed: {
    s() {
      const { missionForm, missionFormRecruit } = this.$store.state
      return {
        ...missionForm,
        recruit: missionFormRecruit
      }
    },
    validationError() {
      return this.s.recruit.sessions.length >= parseInt(this.s.recruit.nbParticipants) ? null : 'validation error'
    }
  },
  watch: {
    validationError: {
      immediate: true,
      handler(error) {
        this.$store.dispatch('missionForm/handleValidationError', { id: this.validationId, error })
      }
    }
  },
  mounted() {
    this.id = uuidv4()
  },
  beforeDestroy() {
    this.$store.dispatch('missionForm/handleValidationError', { id: this.validationId, error: null })
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitCalendar";
</style>
