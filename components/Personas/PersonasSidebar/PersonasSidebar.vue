<template>
  <div class="personas-sidebar" :class="{ active }">
    <div class="personas-sidebar-close">
      <ButtonCircle type="ARROW_RIGHT" large @click="$emit('close')" />
    </div>
    <div class="personas-sidebar-head">
      <div class="personas-sidebar-head-bg" :class="`${persona.icon.toLowerCase()}-bg`" />
      <div class="personas-sidebar-head-img">
        <div class="personas-sidebar-head-img-icon">
          <PersonaIcon :icon="persona.icon" :white-bg="true" :no-click="true" />
        </div>
        <p class="personas-sidebar-head-img-name" :class="`${persona.icon.toLowerCase()}-bg-font`">
          {{ persona.name }}
        </p>
        <div class="personas-sidebar-head-img-button">
          <ButtonText text="Edit persona" type="GREY" />
        </div>
      </div>
      <PersonasSidebarHeadItem :value="formattedGender" label="Gender" />
      <PersonasSidebarHeadItem :value="formattedAge" label="Age" />
    </div>
    <div class="personas-sidebar-body">
      <PersonasSidebarTable title="General Criteria" :rows="generalCriteria" />
      <PersonasSidebarTable title="Special Criteria" :rows="specialCriteria" />
    </div>
  </div>
</template>

<script>
import ButtonText from '../../_shared/ButtonText/ButtonText'
import PersonaIcon from '../../_shared/PersonaIcon/PersonaIcon'
import PersonasSidebarHeadItem from '../PersonasSidebarHeadItem/PersonasSidebarHeadItem'
import PersonasSidebarTable from '../PersonasSidebarTable/PersonasSidebarTable'
import { firstLetterUppercase } from '../../../utils/stringUtils'
import ButtonCircle from '../../_shared/ButtonCircle/ButtonCircle'
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
    formattedGender() {
      const genders = this.persona.demographicDataReq.gender
      if (!genders.length) {
        return '-'
      } else {
        return firstLetterUppercase(genders[0])
      }
    },
    formattedAge() {
      const { minAge, maxAge } = this.persona.demographicDataReq
      if (minAge && maxAge) {
        return `${minAge} - ${maxAge}`
      } else {
        return '-'
      }
    },
    generalCriteria() {
      return [
        {
          label: 'Occupation',
          value: this.persona.demographicDataReq.occupations.map(item => firstLetterUppercase(item)).join(', ')
        }
      ]
    },
    specialCriteria() {
      return [
        {
          label: '#1',
          value: 'Has to be a customer at either Netflix or Amazon Prime.'
        },
        {
          label: '#2',
          value: 'Has to spend at least around 2 hours per week on Netflix or Amazon Prime.'
        },
        {
          label: '#3',
          value: 'Must live in a flat sharing community in Berlin.'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  @import "PersonasSidebar";
</style>
