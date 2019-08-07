<template>
  <div class="mission-create-recruit-calendar">
    <MissionCreateRecruitCalendarPlugin :single-select="singleTimeslot" />
    <div v-if="!singleTimeslot" class="mission-create-recruit-calendar-menu">
      <div :id="validationId" class="mission-create-recruit-calendar-menu-count" :class="{ valid: !validationError }">
        <p>{{ s.recruit.sessions.length }} of {{ s.participants }} time slots selected</p>
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
import { MISSION_RECRUIT_STUDY_TYPES } from '../../constants'

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
    singleTimeslot() {
      const { FOCUS_GROUP, WORKSHOP } = MISSION_RECRUIT_STUDY_TYPES
      return [FOCUS_GROUP, WORKSHOP].includes(this.s.recruit.studyType)
    },
    validationError() {
      const sessions = this.s.recruit.sessions
      if (this.singleTimeslot && sessions.length === 1) {
        return null
      }
      return sessions.length >= parseInt(this.s.participants) ? null : 'validation error'
    }
  },
  watch: {
    validationError(e) { this.errorHandler(e) }
  },
  mounted() {
    this.validationId = uuidv4()
    this.errorHandler()
  },
  beforeDestroy() {
    this.$store.dispatch('missionForm/handleValidationError', { id: this.validationId, error: null })
  },
  methods: {
    errorHandler(error = this.validationError) {
      this.$store.dispatch('missionForm/handleValidationError', { id: this.validationId, error })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitCalendar";
</style>
