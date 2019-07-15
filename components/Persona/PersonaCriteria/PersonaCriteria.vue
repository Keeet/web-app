<template>
  <div class="persona-criteria">
    <PersonaCriteriaBox
      headline="Age"
      :opened="s.ageOpened"
      @open="openAge"
      @close="closeAge"
    >
      <div class="persona-criteria-age">
        <div class="persona-criteria-age-slider">
          <vue-slider
            v-model="ageRange"
            :min="AGE_RANGE[0]"
            :max="AGE_RANGE[1]"
            :enable-cross="false"
            :min-range="10"
            :dot-size="20"
            tooltip="always"
            :lazy="true"
            :contained="true"
          />
        </div>
      </div>
    </PersonaCriteriaBox>
    <PersonaCriteriaBox
      headline="Gender"
      :opened="s.gendersOpened"
      @open="openGenders"
      @close="closeGenders"
    >
      <PersonaCriteriaChecklist
        mutation="personaForm/setGenders"
        :values="Object.keys(PERSONA_GENDERS)"
        :labels="PERSONA_GENDER_LABELS"
        :value="s.genders"
      />
    </PersonaCriteriaBox>
    <PersonaCriteriaBox
      headline="Occupation"
      :opened="s.occupationsOpened"
      @open="openOccupations"
      @close="closeOccupations"
    >
      <PersonaCriteriaChecklist
        mutation="personaForm/setOccupations"
        :values="Object.keys(PERSONA_OCCUPATIONS)"
        :labels="PERSONA_OCCUPATION_LABELS"
        :value="s.occupations"
      />
    </PersonaCriteriaBox>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import PersonaCriteriaBox from '../PersonaCriteriaBox/PersonaCriteriaBox'
import PersonaCriteriaChecklist from '../PersonaCriteriaChecklist/PersonaCriteriaChecklist'
import { PERSONA_GENDERS, PERSONA_GENDER_LABELS, PERSONA_OCCUPATIONS, PERSONA_OCCUPATION_LABELS } from '../../constants'

const AGE_RANGE = [18, 85]

export default {
  name: 'PersonaCriteria',
  components: { PersonaCriteriaChecklist, VueSlider, PersonaCriteriaBox },
  data() {
    return {
      AGE_RANGE,
      PERSONA_GENDERS,
      PERSONA_GENDER_LABELS,
      PERSONA_OCCUPATIONS,
      PERSONA_OCCUPATION_LABELS
    }
  },
  computed: {
    s() {
      return this.$store.state.personaForm
    },
    ageRange: {
      get() {
        const { minAge, maxAge } = this.s
        if (minAge && maxAge) {
          return [minAge, maxAge]
        } else {
          return AGE_RANGE
        }
      },
      set(value) {
        this.$store.commit('personaForm/setAgeRange', value)
      }
    }
  },
  methods: {
    openAge() {
      const { minAge, maxAge } = this.s
      if (!minAge || !maxAge) {
        this.$store.commit('personaForm/setAgeRange', AGE_RANGE)
      }
      this.$store.commit('personaForm/setAgeOpened', true)
    },
    closeAge() {
      this.$store.commit('personaForm/setAgeRange', [null, null])
      this.$store.commit('personaForm/setAgeOpened', false)
    },
    openGenders() {
      this.$store.commit('personaForm/setGendersOpened', true)
    },
    closeGenders() {
      this.$store.commit('personaForm/setGenders')
      this.$store.commit('personaForm/setGendersOpened', false)
    },
    openOccupations() {
      this.$store.commit('personaForm/setOccupationsOpened', true)
    },
    closeOccupations() {
      this.$store.commit('personaForm/setOccupations')
      this.$store.commit('personaForm/setOccupationsOpened', false)
    }
  }
}
</script>

<style lang="scss">
  @import "../../../assets/style/slider";
</style>

<style scoped lang="scss">
  @import "PersonaCriteria";
</style>
