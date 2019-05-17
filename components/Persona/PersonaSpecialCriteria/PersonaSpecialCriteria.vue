<template>
  <div class="persona-special-criteria">
    <PersonaSpecialCriteriaInput
      v-for="(_, x) in s.screenerQuestions"
      :key="x"
      :screener-index="x"
      @delete="deleteScreenerQuestion(x)"
    />
    <PersonaSpecialCriteriaInput placeholder="e.g. Mix of vegetarians and non-vegetarians" @add="addScreenerQuestion" />
  </div>
</template>

<script>
import PersonaSpecialCriteriaInput from '../PersonaSpecialCriteriaInput/PersonaSpecialCriteriaInput'
export default {
  name: 'PersonaSpecialCriteria',
  components: { PersonaSpecialCriteriaInput },
  computed: {
    s() {
      return this.$store.state.personaForm
    }
  },
  methods: {
    addScreenerQuestion() {
      this.$store.commit('personaForm/addScreenerQuestion', this.s.newScreenerQuestion)
      this.$store.commit('personaForm/setNewScreenerQuestion')
    },
    deleteScreenerQuestion(index) {
      this.$store.commit('personaForm/deleteScreenerQuestion', index)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "PersonaSpecialCriteria";
</style>
