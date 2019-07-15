<template>
  <div class="mission-persona-criteria-item-special-criteria">
    <MissionPersonaCriteriaItemSpecialCriteriaInput
      v-for="(_, x) in s.specialCriteria"
      :key="x"
      :index="x"
      @delete="deleteSpecialCriteria(x)"
    />
    <MissionPersonaCriteriaItemSpecialCriteriaInput placeholder="e.g. Must own a car." @add="addSpecialCriteria" />
    <p class="mission-persona-criteria-item-special-criteria-note">
      Please enter only one criterion per input field. Each criterion will be charged separately. To find eligible candidates, we will create
      open screening questions based on your criteria.
    </p>
  </div>
</template>

<script>
import MissionPersonaCriteriaItemSpecialCriteriaInput
  from '../MissionPersonaCriteriaItemSpecialCriteriaInput/MissionPersonaCriteriaItemSpecialCriteriaInput'
export default {
  name: 'MissionPersonaCriteriaItemSpecialCriteria',
  components: { MissionPersonaCriteriaItemSpecialCriteriaInput },
  computed: {
    s() {
      return this.$store.state.missionFormPersona
    }
  },
  methods: {
    addSpecialCriteria() {
      this.$store.commit('missionFormPersona/addSpecialCriteria', this.s.newSpecialCriteria)
      this.$store.commit('missionFormPersona/setNewSpecialCriteria')
    },
    deleteSpecialCriteria(index) {
      this.$store.commit('missionFormPersona/deleteSpecialCriteria', index)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionPersonaCriteriaItemSpecialCriteria";
</style>
