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
      Please only insert one special criteria per input. We will create screener questions to find eligible participants.
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
