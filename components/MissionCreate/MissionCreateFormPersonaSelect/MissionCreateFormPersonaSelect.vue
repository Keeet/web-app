<template>
  <div class="mission-create-form-persona-select">
    <SelectCustom
      :opened="s.personaDropdownOpened"
      :value="s.persona ? s.persona.id : null"
      :options="selectPersonaOptions"
      :error="error"
      placeholder="Choose persona"
      @select="select"
      @clickHead="$store.commit('missionForm/switchPersonaDropdown')"
    >
      <template v-if="s.persona" slot="selected">
        <div class="mission-create-form-persona-select-option">
          <div class="mission-create-form-persona-select-option-icon">
            <PersonaIcon :icon="s.persona.icon" adjust-size />
          </div>
          <p class="mission-create-form-persona-select-option-title">
            {{ s.persona.name }}
          </p>
        </div>
      </template>
      <template v-for="(persona, x) in allPersonas" :slot="persona.id">
        <div :key="x" class="mission-create-form-persona-select-option">
          <div class="mission-create-form-persona-select-option-icon">
            <PersonaIcon :icon="persona.icon" adjust-size />
          </div>
          <p class="mission-create-form-persona-select-option-title">
            {{ persona.name }}
          </p>
        </div>
      </template>
      <template slot="new">
        <div class="mission-create-form-persona-select-option">
          <div class="mission-create-form-persona-select-option-icon">
            <ButtonCircle type="CREATE_GREY" adjust-width no-hover />
          </div>
          <p class="mission-create-form-persona-select-option-title">
            Create new
          </p>
        </div>
      </template>
    </SelectCustom>
  </div>
</template>

<script>
import SelectCustom from '../../_shared/SelectCustom/SelectCustom'
import PersonaIcon from '../../_shared/PersonaIcon/PersonaIcon'
import ButtonCircle from '../../_shared/ButtonCircle/ButtonCircle'
export default {
  name: 'MissionCreateFormPersonaSelect',
  components: { ButtonCircle, PersonaIcon, SelectCustom },
  props: {
    error: {
      type: String,
      default: null
    }
  },
  computed: {
    s() {
      return this.$store.state.missionForm
    },
    personas() {
      return this.$store.state.personas
    },
    allPersonas() {
      const personas = this.personas.slice()
      this.s.tempPersonas.forEach(persona => personas.push(persona))
      return personas
    },
    selectPersonaOptions() {
      const ids = this.allPersonas.map(persona => persona.id).slice()
      ids.push('new')
      return ids
    }
  },
  methods: {
    select(personaId) {
      this.$store.commit('missionForm/switchPersonaDropdown')
      if (personaId === 'new') {
        this.$store.commit('personaForm/init')
        this.$store.commit('personaForm/setMissionEntrypoint')
        this.$router.push('/personas/create')
      } else {
        const persona = this.allPersonas.filter(p => p.id === personaId)[0]
        this.$store.commit('missionForm/setPersona', persona)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateFormPersonaSelect";
</style>
