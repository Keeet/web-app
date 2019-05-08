<template>
  <div class="persona">
    <div class="persona-cancel">
      <ButtonCircle type="ARROW_LEFT" @click="$router.back()" />
    </div>
    <Headline text="Create your avatar" center />
    <PersonaStep :show-prev="false" :valid="step1Valid">
      <PersonaAvatar />
    </PersonaStep>
  </div>
</template>

<script>
import Headline from '../_shared/Headline/Headline'
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
import PersonaAvatar from './PersonaAvatar/PersonaAvatar'
import PersonaStep from './PersonaStep/PersonaStep'
export default {
  name: 'Persona',
  components: { ButtonCircle, PersonaStep, PersonaAvatar, Headline },
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
