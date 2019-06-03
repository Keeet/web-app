<template>
  <div class="mission-create">
    <div v-show="!s.pending" class="mission-create-body">
      <ButtonCircle class="mission-create-cancel" type="ARROW_LEFT" @click="cancel" />
      <MissionCreateType v-if="s.activeStep === 0" />
      <FormStep
        v-if="[MISSIONS.IN_HOUSE, MISSIONS.REMOTE].includes(s.type)"
        :next-step-mutation="nextMut"
        :prev-step-mutation="prevMut"
        :active="s.activeStep === 1"
        :valid="s.formValid"
        @invalidNext="showFormErrors = true"
      >
        <MissionCreateHeadline :text="`1 / 3 ${MISSION_LABELS[s.type]} Mission`" />
        <MissionCreateRecruitForm :show-errors="showFormErrors" />
      </FormStep>
      <div v-else-if="s.type === MISSIONS.SURVEY">
        <MissionCreateSurvey />
      </div>
      <FormStep
        :next-step-mutation="nextMut"
        :prev-step-mutation="prevMut"
        :active="s.activeStep === 2"
        :valid="calendarValid"
      >
        <div class="mission-create-calendar-headline">
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
    <Loading v-if="s.pending" fixed-center />
    <MissionCreateRecruitSubmittedPopup v-if="s.submittedPopup" />
  </div>
</template>

<script>
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
import FormStep from '../_shared/FormStep/FormStep'
import { MISSIONS, MISSION_LABELS } from '../constants'
import Loading from '../_shared/Loading/Loading'
import MissionCreateType from './MissionCreateType/MissionCreateType'
import MissionCreateRecruitCalendar from './MissionCreateRecruitCalendar/MissionCreateRecruitCalendar'
import MissionCreateHeadline from './MissionCreateHeadline/MissionCreateHeadline'
import MissionCreateSubHeadline from './MissionCreateSubHeadline/MissionCreateSubHeadline'
import MissionCreateSurvey from './MissionCreateSurvey/MissionCreateSurvey'
import MissionCreateRecruitSummary from './MissionCreateRecruitSummary/MissionCreateRecruitSummary'
import MissionCreateRecruitSubmittedPopup
  from './MissionCreateRecruitSubmittedPopup/MissionCreateRecruitSubmittedPopup'
import MissionCreateRecruitForm from './MissionCreateRecruitForm/MissionCreateRecruitForm'

export default {
  name: 'MissionCreate',
  components: {
    MissionCreateRecruitForm,
    MissionCreateRecruitSubmittedPopup,
    MissionCreateRecruitSummary,
    Loading,
    MissionCreateSubHeadline,
    MissionCreateHeadline,
    FormStep,
    MissionCreateRecruitCalendar,
    MissionCreateType,
    ButtonCircle,
    MissionCreateSurvey
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
      return this.$store.state.missionForm
    },
    activeStep() {
      return this.s.activeStep
    },
    calendarValid() {
      return this.s.sessions.length >= this.s.nbParticipants
    }
  },
  watch: {
    activeStep() {
      window.scrollTo(0, 0)
    }
  },
  methods: {
    cancel() {
      if (this.s.activeStep === 0) {
        this.$router.back()
      } else {
        this.$store.commit('missionForm/previousStep')
      }
    },
    buildMission() {
      const { projectId, type, title, description, duration, language, persona, sessions, location } = this.s
      const mission = {
        projectId,
        type,
        title,
        description,
        duration,
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
        this.$store.commit('missionForm/showSubmittedPopup')
      })
    }
  }
}
</script>

<style scoped lang="scss">
 @import "MissionCreate";
</style>
