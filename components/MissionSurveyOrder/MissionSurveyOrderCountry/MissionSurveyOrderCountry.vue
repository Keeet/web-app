<template>
  <div class="mission-survey-order-country">
    <Select
      :options="options"
      :value="s.countries[0]"
      mutation="missionFormPersona/setCountry"
      no-margin
    />
  </div>
</template>

<script>
import { COUNTRIES_SURVEY_RECRUIT, COUNTRY_LABELS } from '../../constants'
import Select from '../../_shared/Select/Select'
export default {
  name: 'MissionSurveyOrderCountry',
  components: { Select },
  computed: {
    s() {
      return this.$store.state.missionFormPersona
    },
    options() {
      return Object.entries(COUNTRIES_SURVEY_RECRUIT).map((value) => {
        const countryValue = value[1]
        return {
          value: countryValue,
          label: COUNTRY_LABELS[countryValue]
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyOrderCountry";
</style>
