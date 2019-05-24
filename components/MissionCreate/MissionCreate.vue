<template>
  <div class="mission-create">
    <ButtonCircle class="mission-create-cancel" type="ARROW_LEFT" @click="cancel" />
    <MissionCreateType v-if="s.activeStep === 0" />
    <FormStep
      :next-step-mutation="nextMut"
      :prev-step-mutation="prevMut"
      :active="s.activeStep === 1"
    >
      <MissionCreateHeadline :text="`1 / 3 ${MISSION_LABELS[s.type]} Mission`" />
      <MissionCreateForm />
    </FormStep>
    <FormStep
      :next-step-mutation="nextMut"
      :prev-step-mutation="prevMut"
      :active="s.activeStep === 2"
    >
      <div class="mission-create-calendar-headline">
        <MissionCreateHeadline :text="`2 / 3 ${MISSION_LABELS[s.type]} Mission`" subtitle="When are you able to conduct the interview / test?" />
      </div>
      <MissionCreateCalendar />
    </FormStep>
  </div>
</template>

<script>
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
import FormStep from '../_shared/FormStep/FormStep'
import { MISSION_LABELS } from '../constants'
import MissionCreateType from './MissionCreateType/MissionCreateType'
import MissionCreateForm from './MissionCreateForm/MissionCreateForm'
import MissionCreateCalendar from './MissionCreateCalendar/MissionCreateCalendar'
import MissionCreateHeadline from './MissionCreateHeadline/MissionCreateHeadline'

export default {
  name: 'MissionCreate',
  components: { MissionCreateHeadline, FormStep, MissionCreateCalendar, MissionCreateForm, MissionCreateType, ButtonCircle },
  data() {
    return {
      nextMut: 'missionForm/nextStep',
      prevMut: 'missionForm/previousStep',
      MISSION_LABELS
    }
  },
  computed: {
    s() {
      return this.$store.state.missionForm
    },
    activeStep() {
      return this.s.activeStep
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
    }
  }
}
</script>

<style scoped lang="scss">
 @import "MissionCreate";
</style>
