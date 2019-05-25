<template>
  <div class="mission-create">
    <div v-show="!s.pending" class="mission-create-body">
      <ButtonCircle class="mission-create-cancel" type="ARROW_LEFT" @click="cancel" />
      <MissionCreateType v-if="s.activeStep === 0" />
      <FormStep
        :next-step-mutation="nextMut"
        :prev-step-mutation="prevMut"
        :active="s.activeStep === 1"
        :valid="s.formValid"
        @invalidNext="showFormErrors = true"
      >
        <MissionCreateHeadline :text="`1 / 3 ${MISSION_LABELS[s.type]} Mission`" />
        <MissionCreateForm :show-errors="showFormErrors" />
      </FormStep>
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
        <MissionCreateCalendar />
      </FormStep>
      <FormStep
        :show-next="false"
        :prev-step-mutation="prevMut"
        :active="s.activeStep === 3"
      >
        <MissionCreateHeadline :text="`3 / 3 ${MISSION_LABELS[s.type]} Mission`" />
        <MissionCreateSummary @submit="submit" />
      </FormStep>
    </div>
    <Loading v-if="s.pending" fixed-center />
  </div>
</template>

<script>
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
import FormStep from '../_shared/FormStep/FormStep'
import { MISSION_LABELS } from '../constants'
import Loading from '../_shared/Loading/Loading'
import MissionCreateType from './MissionCreateType/MissionCreateType'
import MissionCreateForm from './MissionCreateForm/MissionCreateForm'
import MissionCreateCalendar from './MissionCreateCalendar/MissionCreateCalendar'
import MissionCreateHeadline from './MissionCreateHeadline/MissionCreateHeadline'
import MissionCreateSubHeadline from './MissionCreateSubHeadline/MissionCreateSubHeadline'
import MissionCreateSummary from './MissionCreateSummary/MissionCreateSummary'

export default {
  name: 'MissionCreate',
  components: { Loading, MissionCreateSummary, MissionCreateSubHeadline, MissionCreateHeadline, FormStep, MissionCreateCalendar, MissionCreateForm, MissionCreateType, ButtonCircle },
  data() {
    return {
      nextMut: 'missionForm/nextStep',
      prevMut: 'missionForm/previousStep',
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
  mounted() {
    if (!this.s.init) {
      // project unknown
      this.$router.push('/')
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
      const { projectId, type, title, description, duration, persona, sessions, location } = this.s
      const { country, city, zipCode, street, houseNumber, addressDescription } = location
      return {
        projectId,
        type,
        title,
        description,
        duration,
        persona,
        sessions: sessions.map(session => session.start.toISOString()),
        country,
        city,
        zipCode,
        street,
        houseNumber,
        addressDescription
      }
    },
    submit() {
      const { projectId } = this.s
      this.$store.commit('missionForm/pending')
      this.$push.createMission(this.buildMission()).then(() => {
        this.$fetch([{ name: 'PROJECT', id: projectId, forced: true }]).then(() => {
          this.$store.commit('missionForm/submitted')
          this.$router.push(`/projects/${projectId}`)
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
 @import "MissionCreate";
</style>
