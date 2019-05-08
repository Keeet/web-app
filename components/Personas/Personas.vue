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
    <div
      v-closable="{
        excludeClasses: ['personas-icons-item', 'personas-delete-popup'],
        handler: 'closeSidebar'
      }"
      class="personas-sidebar"
    >
      <PersonasSidebar
        :active="personasPageStore.sidebarActive"
        :persona="sidebarPersona"
        @close="closeSidebar"
        @delete="showDeletePopup"
      />
    </div>
    <div class="personas-delete-popup">
      <Confirm
        v-show="personasPageStore.deletePopup"
        :text="`Do you really want to delete the persona ${sidebarPersona.name}?`"
        :context="sidebarPersona"
        :loading="personasPageStore.deletePending"
        trigger-class="personas-sidebar-head-delete"
        @confirm="deletePersona"
        @cancel="hideDeletePopup"
      />
    </div>
  </div>
</template>

<script>
import Headline from '../_shared/Headline/Headline'
import samplePersona from '../../assets/samples/samplePersona'
import PersonaIcon from '../_shared/PersonaIcon/PersonaIcon'
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
import Confirm from '../_shared/Confirm/Confirm'
import PersonasSidebar from './PersonasSidebar/PersonasSidebar'

export default {
  name: 'Persona',
  components: { Confirm, PersonasSidebar, ButtonCircle, PersonaIcon, Headline },
  data() {
    return {
      samplePersona
    }
  },
  computed: {
    personasPageStore() {
      return this.$store.state.personasPage
    },
    sidebarPersona() {
      return this.personasPageStore.sidebarPersona || samplePersona
    },
    personas() {
      return this.$store.state.personas
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
      if (this.personasPageStore.sidebarActive) {
        this.$store.commit('personasPage/setSidebarActive', false)
      }
    },
    showDeletePopup() {
      this.$store.commit('personasPage/showDeletePopup')
    },
    hideDeletePopup() {
      this.$store.commit('personasPage/hideDeletePopup')
    },
    deletePersona(persona) {
      this.$store.commit('personasPage/setDeletePending', true)
      window.setTimeout(() => {
        // this.$axios.$post('/persona', persona)
        this.hideDeletePopup()
        this.closeSidebar()
        this.$store.commit('personasPage/setDeletePending', false)
      }, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "Personas";
</style>
