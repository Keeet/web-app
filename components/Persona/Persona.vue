<template>
  <div class="persona">
    <div class="persona-cancel">
      <ButtonCircle type="ARROW_LEFT" @click="a" />
    </div>
    <div v-show="!pending" class="persona-form">
      <FormStep
        :show-prev="false"
        :valid="step1Valid"
        :active="activeStep === 0"
        :next-step-mutation="nextMut"
        :prev-step-mutation="prevMut"
      >
        <Headline :text="avatarHeadline" center />
        <PersonaAvatar />
      </FormStep>
      <FormStep
        :valid="true"
        large
        :active="activeStep === 1"
        :next-step-mutation="nextMut"
        :prev-step-mutation="prevMut"
      >
        <Headline
          text="What is your desired target group?"
          subline="Please define your exact criteria to ensure we can recruit the exact target group."
          center
        />
        <PersonaCriteria />
      </FormStep>
      <FormStep
        :valid="true"
        large
        :active="activeStep === 2"
        :submit="submitButtonLabel"
        :next-step-mutation="nextMut"
        :prev-step-mutation="prevMut"
        @submit="submit"
      >
        <Headline
          text="Special criteria"
          subline="Based on the criteria, we will create open screening questions to find matching candidates."
          center
        />
        <PersonaSpecialCriteria />
      </FormStep>
    </div>
    <Confirm
      v-if="s.showSaveTemp"
      :title="`Keep ${s.name}?`"
      text="Do you want to save this persona for future missions?"
      @confirm="submit(true)"
      @cancel="submitTempForMission"
      @close="$store.commit('personaForm/setShowSaveTemp', false)"
    />
    <div v-show="pending" class="persona-pending">
      <Loading />
    </div>
  </div>
</template>

<script>
import uuidv4 from 'uuid/v4'
import Headline from '../_shared/Headline/Headline'
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
import Confirm from '../_shared/Confirm/Confirm'
import FormStep from '../_shared/FormStep/FormStep'
import PersonaAvatar from './PersonaAvatar/PersonaAvatar'
import PersonaCriteria from './PersonaCriteria/PersonaCriteria'
import PersonaSpecialCriteria from './PersonaSpecialCriteria/PersonaSpecialCriteria'
export default {
  name: 'Persona',
  components: { FormStep, Confirm, PersonaSpecialCriteria, PersonaCriteria, ButtonCircle, PersonaAvatar, Headline },
  data() {
    return {
      nextMut: 'personaForm/nextStep',
      prevMut: 'personaForm/previousStep'
    }
  },
  computed: {
    s() {
      return this.$store.state.personaForm
    },
    nameError() { return this.s.name !== '' ? null : 'required' },
    iconError() { return this.s.icon !== null ? null : 'required' },
    step1Valid() {
      return !this.nameError && !this.iconError
    },
    submitButtonLabel() {
      return this.s.id ? `Update Persona ${this.s.name}` : `Create Persona ${this.s.name}`
    },
    avatarHeadline() {
      return this.s.id ? 'Update your avatar' : 'Create your avatar'
    },
    pending() {
      return this.$store.state.personaForm.pending
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
    buildPersona(generateId = false) {
      const { id, name, icon, minAge, maxAge, genders, occupations, screenerQuestions } = this.s
      return {
        id: generateId ? uuidv4() : id,
        name,
        icon,
        demographicDataReq: { minAge, maxAge, genders, occupations },
        screenerQuestions
      }
    },
    submit(skipSaveTemp = false) {
      if (this.s.missionEntrypoint && !skipSaveTemp) {
        this.$store.commit('personaForm/setShowSaveTemp', true)
        return
      }
      if (this.s.showSaveTemp) {
        this.$store.commit('personaForm/setShowSaveTemp', false)
      }
      // const req = this.buildPersona()
      if (this.s.id === null) {
        // TODO: implement API
        // CREATE
        // this.$axios.post('/personas', this.store).then(() => {
        //   this.$emit('submit')
        // })
      } else {
        // UPDATE
      }
      this.$store.commit('personaForm/pending')
      window.setTimeout(() => {
        this.$store.commit('personaForm/submitted')
        this.$fetch([{ name: 'PERSONAS', forced: true }]).then(() => {
          const createdPersona = this.$store.state.personas.filter(p => p.name === this.s.name)[0]

          if (this.s.missionEntrypoint) {
            this.$store.commit('missionForm/setPersona', createdPersona)
            this.$router.push('/missions/create')
            return
          }

          this.$router.push('/personas')
        })
      }, 1000)
    },
    submitTempForMission() {
      const persona = this.buildPersona(true)
      this.$store.commit('personaForm/submitted')
      this.$store.commit('missionForm/addTempPersona', persona)
      this.$store.commit('missionForm/setPersona', persona)
      this.$router.push('/missions/create')
    },
    cancel() {
      if (this.s.activeStep === 0) {
        this.$router.back()
      } else {
        this.$store.commit('personaForm/previousStep')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "Persona";
</style>
