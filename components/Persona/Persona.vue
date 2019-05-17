<template>
  <div class="persona">
    <div class="persona-cancel">
      <ButtonCircle type="ARROW_LEFT" @click="$router.back()" />
    </div>
    <PersonaStep :show-prev="false" :valid="step1Valid">
      <Headline text="Create your avatar" center />
      <PersonaAvatar />
    </PersonaStep>
    <PersonaStep active :valid="true" large>
      <Headline
        text="What is your desired target group?"
        subline="Please define your exact criteria to ensure we can recruit the exact target group."
        center
      />
      <PersonaCriteria />
    </PersonaStep>
  </div>
</template>

<script>
import Headline from '../_shared/Headline/Headline'
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
import PersonaAvatar from './PersonaAvatar/PersonaAvatar'
import PersonaStep from './PersonaStep/PersonaStep'
import PersonaCriteria from './PersonaCriteria/PersonaCriteria'
export default {
  name: 'Persona',
  components: { PersonaCriteria, ButtonCircle, PersonaStep, PersonaAvatar, Headline },
  computed: {
    s() {
      return this.$store.state.personaForm
    },
    nameError() { return this.s.name !== '' ? null : 'required' },
    iconError() { return this.s.icon !== null ? null : 'required' },
    step1Valid() {
      return !this.nameError && !this.iconError
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "Persona";
</style>
