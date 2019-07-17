<template>
  <div class="mission-survey-order-country">
    <Select
      title="Country"
      :options="options"
      :value="s.countries[0]"
      mutation="missionFormPersona/setCountry"
      no-margin
    />
  </div>
</template>

<script>
import { COUNTRIES, COUNTRY_LABELS } from '../../constants'
import Select from '../../_shared/Select/Select'
export default {
  name: 'MissionSurveyOrderCountry',
  components: { Select },
  computed: {
    s() {
      return this.$store.state.missionFormPersona
    },
    options() {
      return Object.keys(COUNTRIES).map(value => ({
        value,
        label: COUNTRY_LABELS[value]
      }))
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyOrderCountry";
</style>
