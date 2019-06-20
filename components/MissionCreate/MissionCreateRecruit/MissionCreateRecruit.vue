<template>
  <div class="mission-create-recruit">
    <FormStep
      :next-step-mutation="nextMut"
      :prev-step-mutation="prevMut"
      :active="s.activeStep === 1"
      :valid="s.recruit.formValid"
      @invalidNext="showFormErrors = true"
    >
      <MissionCreateHeadline :text="`1 / 3 ${MISSION_LABELS[s.type]} Mission`" />
      <MissionCreateRecruitForm :show-errors="showFormErrors" />
    </FormStep>
    <FormStep
      :next-step-mutation="nextMut"
      :prev-step-mutation="prevMut"
      :active="s.activeStep === 2"
      :valid="calendarValid"
    >
      <div class="mission-create-recruit-calendar-headline">
        <MissionCreateHeadline :text="`2 / 3 ${MISSION_LABELS[s.type]} Mission`" />
        <MissionCreateSubHeadline text="When are you able to conduct the interview / test?" />
      </div>
      <MissionCreateRecruitCalendar />
    </FormStep>
    <FormStep
      :show-next="false"
      :prev-step-mutation="prevMut"
      :active="s.activeStep === 3"
    >
      <MissionCreateHeadline :text="`3 / 3 ${MISSION_LABELS[s.type]} Mission`" />
      <MissionCreateRecruitSummary @submit="submit" />
    </FormStep>
  </div>
</template>

<script>
import FormStep from '../../_shared/FormStep/FormStep'
import MissionCreateHeadline from '../MissionCreateHeadline/MissionCreateHeadline'
import MissionCreateRecruitForm from '../MissionCreateRecruitForm/MissionCreateRecruitForm'
import MissionCreateSubHeadline from '../MissionCreateSubHeadline/MissionCreateSubHeadline'
import MissionCreateRecruitCalendar from '../MissionCreateRecruitCalendar/MissionCreateRecruitCalendar'
import MissionCreateRecruitSummary from '../MissionCreateRecruitSummary/MissionCreateRecruitSummary'
import { MISSIONS, MISSION_LABELS } from '../../constants'

export default {
  name: 'MissionCreateRecruit',
  components: {
    MissionCreateRecruitSummary,
    MissionCreateRecruitCalendar,
    MissionCreateSubHeadline,
    MissionCreateRecruitForm,
    MissionCreateHeadline,
    FormStep
  },
  data() {
    return {
      nextMut: 'missionForm/nextStep',
      prevMut: 'missionForm/previousStep',
      MISSIONS,
      MISSION_LABELS,
      showFormErrors: false
    }
  },
  computed: {
    s() {
      const { missionForm, missionFormRecruit } = this.$store.state
      return {
        ...missionForm,
        recruit: missionFormRecruit
      }
    },
    activeStep() {
      return this.s.activeStep
    },
    calendarValid() {
      return this.s.recruit.sessions.length >= parseInt(this.s.recruit.nbParticipants)
    }
  },
  methods: {
    buildMission() {
      const { projectId, type, title, language } = this.s
      const { duration, persona, sessions, location } = this.s.recruit
      const mission = {
        projectId,
        type,
        title,
        duration: parseInt(duration),
        language,
        persona,
        sessions: sessions.map(session => session.start.toISOString())
      }
      if (type === MISSIONS.IN_HOUSE) {
        const { country, city, zipCode, street, houseNumber, addressDescription } = location
        return {
          ...mission,
          country,
          city,
          zipCode,
          street,
          houseNumber,
          addressDescription
        }
      }
      return mission
    },
    submit() {
      this.$store.commit('missionForm/pending')
      this.$push.createMission(this.buildMission()).then(({ id }) => {
        this.$store.commit('missionForm/setSubmittedMissionId', id)
        this.$store.commit('missionFormRecruit/showSubmittedPopup')
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruit";
</style>
