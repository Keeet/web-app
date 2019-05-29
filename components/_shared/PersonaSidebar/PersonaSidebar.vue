<template>
  <div
    class="persona-sidebar"
    :class="{ active }"
  >
    <div class="persona-sidebar-close">
      <ButtonCircle type="ANGLE_RIGHT" large @click="$emit('close')" />
    </div>
    <div class="persona-sidebar-head">
      <div class="persona-sidebar-head-bg" :class="`${persona.icon.toLowerCase()}-bg`" />
      <div v-if="!readonly" class="persona-sidebar-head-delete">
        <IconDelete @click="$emit('delete')" />
      </div>
      <div class="persona-sidebar-head-img">
        <div class="persona-sidebar-head-img-icon">
          <PersonaIcon :icon="persona.icon" :white-bg="true" :no-click="true" />
        </div>
        <p class="persona-sidebar-head-img-name" :class="`${persona.icon.toLowerCase()}-bg-font`">
          {{ persona.name }}
        </p>
        <div class="persona-sidebar-head-img-button">
          <ButtonText
            v-if="!readonly"
            text="Edit persona"
            type="GREY"
            @click="$emit('edit', persona)"
          />
        </div>
      </div>
      <PersonaSidebarHeadItem :value="formattedGender" label="Gender" />
      <PersonaSidebarHeadItem :value="formattedAge" label="Age" />
    </div>
    <div class="persona-sidebar-body">
      <PersonaSidebarTable v-if="generalCriteria.length" title="General Criteria" :rows="generalCriteria" />
      <PersonaSidebarTable v-if="specialCriteria.length" title="Special Criteria" :rows="specialCriteria" />
    </div>
  </div>
</template>

<script>
import ButtonText from '../../_shared/ButtonText/ButtonText'
import PersonaIcon from '../../_shared/PersonaIcon/PersonaIcon'
import ButtonCircle from '../../_shared/ButtonCircle/ButtonCircle'
import { PERSONA_OCCUPATION_LABELS, PERSONA_GENDER_LABELS } from '../../constants'
import PersonaSidebarHeadItem from './PersonaSidebarHeadItem/PersonaSidebarHeadItem'
import PersonaSidebarTable from './PersonaSidebarTable/PersonaSidebarTable'

export default {
  name: 'PersonaSidebar',
  components: { PersonaSidebarTable, PersonaSidebarHeadItem, ButtonCircle, PersonaIcon, ButtonText },
  props: {
    persona: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
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
      const occupations = this.persona.demographicDataReq.occupations
      if (!occupations.length) {
        return []
      }
      return [
        {
          label: 'Occupation',
          value: occupations.map(item => PERSONA_OCCUPATION_LABELS[item]).join(', ')
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
  }
}
</script>

<style scoped lang="scss">
  @import "PersonaSidebar";
</style>
