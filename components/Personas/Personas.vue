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
        <PersonaIcon :icon="samplePersona.icon" :name="samplePersona.name" @click="openSidebar(samplePersona)" />
      </div>
      <div v-for="(persona, x) in personas" :key="x" class="personas-icons-item">
        <PersonaIcon :icon="persona.icon" :name="persona.name" @click="openSidebar(persona)" />
      </div>
    </div>
    <div class="personas-sidebar">
      <PersonasSidebar
        :active="personasPageStore.sidebarActive"
        :persona="personasPageStore.sidebarPersona || samplePersona"
        @close="closeSidebar"
      />
    </div>
  </div>
</template>

<script>
import Headline from '../_shared/Headline/Headline'
import samplePersona from '../../assets/samples/samplePersona'
import PersonaIcon from '../_shared/PersonaIcon/PersonaIcon'
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
import PersonasSidebar from './PersonasSidebar/PersonasSidebar'

export default {
  name: 'Persona',
  components: { PersonasSidebar, ButtonCircle, PersonaIcon, Headline },
  data() {
    return {
      samplePersona
    }
  },
  computed: {
    personas() {
      return this.$store.state.personas
    },
    personasPageStore() {
      return this.$store.state.personasPage
    }
  },
  methods: {
    create() {
      this.$fetch([{ name: 'PERSONAS', forced: true }])
    },
    openSidebar(persona) {
      this.$store.commit('personasPage/setSidebarPersona', persona)
      this.$store.commit('personasPage/setSidebarActive', true)
    },
    closeSidebar() {
      this.$store.commit('personasPage/setSidebarActive', false)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "Personas";
</style>
