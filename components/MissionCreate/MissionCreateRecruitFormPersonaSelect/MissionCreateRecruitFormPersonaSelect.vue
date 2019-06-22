<template>
  <div class="mission-create-recruit-form-persona-select">
    <SelectCustom
      :opened="s.recruit.personaDropdownOpened"
      :value="s.recruit.persona ? s.recruit.persona.id : null"
      :options="selectPersonaOptions"
      :error="personaError"
      dispatch-error="missionForm/handleValidationError"
      :disable-error="!s.showErrors"
      placeholder="Choose persona"
      @select="select"
      @clickHead="$store.commit('missionFormRecruit/switchPersonaDropdown')"
    >
      <template v-if="s.recruit.persona" slot="selected">
        <div class="mission-create-recruit-form-persona-select-option">
          <div class="mission-create-recruit-form-persona-select-option-icon">
            <PersonaIcon :icon="s.recruit.persona.icon" adjust-size />
          </div>
          <p class="mission-create-recruit-form-persona-select-option-title">
            {{ s.recruit.persona.name }}
          </p>
        </div>
      </template>
      <template v-for="(persona, x) in allPersonas" :slot="persona.id">
        <div :key="x" class="mission-create-recruit-form-persona-select-option">
          <div class="mission-create-recruit-form-persona-select-option-icon">
            <PersonaIcon :icon="persona.icon" adjust-size />
          </div>
          <p class="mission-create-recruit-form-persona-select-option-title">
            {{ persona.name }}
          </p>
        </div>
      </template>
      <template slot="new">
        <div class="mission-create-recruit-form-persona-select-option">
          <div class="mission-create-recruit-form-persona-select-option-icon">
            <ButtonCircle type="CREATE_GREY" adjust-width no-hover />
          </div>
          <p class="mission-create-recruit-form-persona-select-option-title">
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
  name: 'MissionCreateRecruitFormPersonaSelect',
  components: { ButtonCircle, PersonaIcon, SelectCustom },
  computed: {
    s() {
      const { missionForm, missionFormRecruit } = this.$store.state
      return {
        ...missionForm,
        recruit: missionFormRecruit
      }
    },
    personas() {
      return this.$store.state.personas
    },
    allPersonas() {
      const personas = this.personas.slice()
      this.s.recruit.tempPersonas.forEach(persona => personas.push(persona))
      return personas
    },
    selectPersonaOptions() {
      const ids = this.allPersonas.map(persona => persona.id).slice()
      ids.push('new')
      return ids
    },
    personaError() { return this.s.recruit.persona ? null : 'required' }
  },
  methods: {
    select(personaId) {
      this.$store.commit('missionFormRecruit/switchPersonaDropdown')
      if (personaId === 'new') {
        this.$store.commit('personaForm/init')
        this.$store.commit('personaForm/setMissionEntrypoint')
        this.$router.push('/personas/create')
      } else {
        const persona = this.allPersonas.filter(p => p.id === personaId)[0]
        this.$store.commit('missionFormRecruit/setPersona', persona)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitFormPersonaSelect";
</style>
