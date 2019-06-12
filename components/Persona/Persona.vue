<template>
  <div class="persona">
    <div class="persona-cancel">
      <ButtonCircle type="ARROW_LEFT" @click="cancel" />
    </div>
    <div v-show="!pending" class="persona-form">
      <div class="persona-form-avatar">
        <FormStep
          :show-prev="false"
          :valid="step1Valid"
          :active="activeStep === 0"
          :next-step-mutation="nextMut"
          :prev-step-mutation="prevMut"
          @invalidNext="showStep1Errors = true"
        >
          <Headline :text="avatarHeadline" center />
          <PersonaAvatar :name-error="nameError" :show-errors="showStep1Errors || isUpdate" />
        </FormStep>
      </div>
      <FormStep
        :valid="true"
        large
        :active="activeStep === 1"
        :next-step-mutation="nextMut"
        :prev-step-mutation="prevMut"
      >
        <Headline
          text="Target your audience."
          subline="Define demographic criteria to target your desired audience."
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
          subline="Choose up to 2 special criteria."
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
    <Loading v-show="pending" fixed-center />
  </div>
</template>

<script>
import uuidv4 from 'uuid/v4'
import Headline from '../_shared/Headline/Headline'
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
import Confirm from '../_shared/Confirm/Confirm'
import FormStep from '../_shared/FormStep/FormStep'
import Loading from '../_shared/Loading/Loading'
import PersonaAvatar from './PersonaAvatar/PersonaAvatar'
import PersonaCriteria from './PersonaCriteria/PersonaCriteria'
import PersonaSpecialCriteria from './PersonaSpecialCriteria/PersonaSpecialCriteria'
export default {
  name: 'Persona',
  components: { Loading, FormStep, Confirm, PersonaSpecialCriteria, PersonaCriteria, ButtonCircle, PersonaAvatar, Headline },
  data() {
    return {
      nextMut: 'personaForm/nextStep',
      prevMut: 'personaForm/previousStep',
      showStep1Errors: false
    }
  },
  computed: {
    s() {
      return this.$store.state.personaForm
    },
    isUpdate() {
      return !!this.s.id
    },
    nameError() {
      const name = this.s.name
      if (name === '') {
        return 'required'
      }
      const sameNamePersonas = this.$store.state.personas.filter(p => p.name === name)
      const sameNamePersona = sameNamePersonas.length ? sameNamePersonas[0] : null
      if (sameNamePersona) {
        const isSameOnUpdate = this.s.id === sameNamePersona.id
        if (!isSameOnUpdate) {
          return 'Name already in use'
        }
      }
      return null
    },
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
        screenerQuestions: screenerQuestions.map(sq => sq.value)
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

      this.$store.commit('personaForm/pending')
      const req = this.buildPersona()
      this.$push.upsertPersona(req).then(() => {
        const upsertedPersona = this.$store.state.personas.filter(p => p.name === this.s.name)[0]

        const sidebarPersona = this.$store.state.personasPage.sidebarPersona
        if (sidebarPersona && sidebarPersona.id === upsertedPersona.id) {
          this.$store.commit('personasPage/setSidebarPersona', upsertedPersona)
        }

        if (this.s.missionEntrypoint) {
          this.$store.commit('missionForm/setPersona', upsertedPersona)
          this.$router.push('/missions/create', () => { this.$store.commit('personaForm/submitted') })
          return
        }

        this.$router.push('/personas', () => { this.$store.commit('personaForm/submitted') })
      })
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
