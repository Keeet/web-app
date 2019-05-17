<template>
  <div
    class="personas-sidebar"
    :class="{ active }"
  >
    <div class="personas-sidebar-close">
      <ButtonCircle type="ANGLE_RIGHT" large @click="close" />
    </div>
    <div class="personas-sidebar-head">
      <div class="personas-sidebar-head-bg" :class="`${persona.icon.toLowerCase()}-bg`" />
      <div class="personas-sidebar-head-delete">
        <IconDelete @click="$emit('delete')" />
      </div>
      <div class="personas-sidebar-head-img">
        <div class="personas-sidebar-head-img-icon">
          <PersonaIcon :icon="persona.icon" :white-bg="true" :no-click="true" />
        </div>
        <p class="personas-sidebar-head-img-name" :class="`${persona.icon.toLowerCase()}-bg-font`">
          {{ persona.name }}
        </p>
        <div class="personas-sidebar-head-img-button">
          <ButtonText text="Edit persona" type="GREY" @click="editPersona" />
        </div>
      </div>
      <PersonasSidebarHeadItem :value="formattedGender" label="Gender" />
      <PersonasSidebarHeadItem :value="formattedAge" label="Age" />
    </div>
    <div class="personas-sidebar-body">
      <PersonasSidebarTable v-if="generalCriteria.length" title="General Criteria" :rows="generalCriteria" />
      <PersonasSidebarTable v-if="specialCriteria.length" title="Special Criteria" :rows="specialCriteria" />
    </div>
  </div>
</template>

<script>
import ButtonText from '../../_shared/ButtonText/ButtonText'
import PersonaIcon from '../../_shared/PersonaIcon/PersonaIcon'
import PersonasSidebarHeadItem from '../PersonasSidebarHeadItem/PersonasSidebarHeadItem'
import PersonasSidebarTable from '../PersonasSidebarTable/PersonasSidebarTable'
import ButtonCircle from '../../_shared/ButtonCircle/ButtonCircle'
import { PERSONA_OCCUPATION_LABELS, PERSONA_GENDER_LABELS } from '../../constants'

export default {
  name: 'PersonasSidebar',
  components: { ButtonCircle, PersonasSidebarTable, PersonasSidebarHeadItem, PersonaIcon, ButtonText },
  props: {
    persona: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    personasPageStore() {
      return this.$store.state.personasPage
    },
    formattedGender() {
      const genders = this.persona.demographicDataReq.genders
      if (!genders.length) {
        return 'n/a'
      } else {
        return PERSONA_GENDER_LABELS[genders[0]]
      }
    },
    formattedAge() {
      const { minAge, maxAge } = this.persona.demographicDataReq
      if (minAge && maxAge) {
        return `${minAge} - ${maxAge}`
      } else {
        return 'n/a'
      }
    },
    generalCriteria() {
      return [
        {
          label: 'Occupation',
          value: this.persona.demographicDataReq.occupations.map(item => PERSONA_OCCUPATION_LABELS[item]).join(', ')
        }
      ]
    },
    specialCriteria() {
      return this.persona.screenerQuestions.map((question, x) => {
        return {
          label: `#${x + 1}`,
          value: question.value
        }
      })
    }
  },
  methods: {
    editPersona() {
      this.$store.commit('personaForm/init', this.persona)
      this.$router.push('/personas/create')
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "PersonasSidebar";
</style>
