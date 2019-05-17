<template>
  <div class="persona">
    <div class="persona-cancel">
      <ButtonCircle type="ARROW_LEFT" @click="$router.back()" />
    </div>
    <PersonaStep :show-prev="false" :valid="step1Valid" :active="s.activeStep === 0">
      <Headline :text="avatarHeadline" center />
      <PersonaAvatar />
    </PersonaStep>
    <PersonaStep :valid="true" large :active="s.activeStep === 1">
      <Headline
        text="What is your desired target group?"
        subline="Please define your exact criteria to ensure we can recruit the exact target group."
        center
      />
      <PersonaCriteria />
    </PersonaStep>
    <PersonaStep :valid="true" large :active="s.activeStep === 2" :submit="submitButtonLabel" @submit="submit">
      <Headline
        text="Special criteria"
        subline="Based on the criteria, we will create open screening questions to find matching candidates."
        center
      />
      <PersonaSpecialCriteria />
    </PersonaStep>
  </div>
</template>

<script>
import Headline from '../_shared/Headline/Headline'
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
import PersonaAvatar from './PersonaAvatar/PersonaAvatar'
import PersonaStep from './PersonaStep/PersonaStep'
import PersonaCriteria from './PersonaCriteria/PersonaCriteria'
import PersonaSpecialCriteria from './PersonaSpecialCriteria/PersonaSpecialCriteria'
export default {
  name: 'Persona',
  components: { PersonaSpecialCriteria, PersonaCriteria, ButtonCircle, PersonaStep, PersonaAvatar, Headline },
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
    }
  },
  methods: {
    submit() {
      // const { id, name, icon, minAge, maxAge, genders, occupations, screenerQuestions } = this.s
      // const req = {
      //   id,
      //   name,
      //   icon,
      //   demographicDataReq: { minAge, maxAge, genders, occupations },
      //   screenerQuestions
      // }
      if (this.s.id === null) {
        // TODO: implement API
        // CREATE
        // this.$axios.post('/personas', this.store).then(() => {
        //   this.$emit('submit')
        // })
      } else {
        // UPDATE
      }
      this.$store.commit('personaForm/submitted')
      this.$router.push('/personas')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "Persona";
</style>
