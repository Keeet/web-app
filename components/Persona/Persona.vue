<template>
  <div class="persona">
    <Headline text="Create your avatar" center />
    <PersonaStep :show-prev="false" :valid="step1Valid">
      <PersonaAvatar />
    </PersonaStep>
  </div>
</template>

<script>
import Headline from '../_shared/Headline/Headline'
import PersonaAvatar from './PersonaAvatar/PersonaAvatar'
import PersonaStep from './PersonaStep/PersonaStep'
export default {
  name: 'Persona',
  components: { PersonaStep, PersonaAvatar, Headline },
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
