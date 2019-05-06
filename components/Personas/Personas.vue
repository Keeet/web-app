<template>
  <div class="personas">
    <div class="personas-head">
      <Headline text="Persona" />
      <div class="personas-create">
        <div v-if="!personas.length" class="personas-create-start">
          <IconStartHereDashboard />
        </div>
        <ButtonCircle type="CREATE" @click="create" />
      </div>
    </div>
    <div class="personas-icons">
      <div v-if="!personas.length" class="personas-icons-item">
        <PersonaIcon :icon="samplePersona.icon" :name="samplePersona.name" />
      </div>
      <div v-for="(persona, x) in personas" :key="x" class="personas-icons-item">
        <PersonaIcon :icon="persona.icon" :name="persona.name" />
      </div>
    </div>
  </div>
</template>

<script>
import Headline from '../_shared/Headline/Headline'
import samplePersona from '../../assets/samples/samplePersona'
import PersonaIcon from '../_shared/PersonaIcon/PersonaIcon'
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'

export default {
  name: 'Persona',
  components: { ButtonCircle, PersonaIcon, Headline },
  data() {
    return {
      samplePersona
    }
  },
  computed: {
    personas() {
      return this.$store.state.personas
    }
  },
  methods: {
    create() {
      this.$fetch([{ name: 'PERSONAS', forced: true }])
    }
  }
}
</script>

<style scoped lang="scss">
  @import "Personas";
</style>
