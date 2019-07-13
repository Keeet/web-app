<template>
  <div class="mission-persona-criteria-item-language">
    <p class="mission-persona-criteria-item-language-title">
      Selecting a secondary language costs additional 5 &euro; per person.
    </p>
    <div class="mission-persona-criteria-item-language-body">
      <div class="mission-persona-criteria-item-language-body-item">
        <Select
          :options="languageOptions"
          :value="$store.getters['missionFormPersona/primaryLanguage']"
          mutation="missionFormPersona/setPrimaryLanguage"
        />
      </div>
      <div class="mission-persona-criteria-item-language-body-item">
        <Select
          :options="[
            { value: null, label: 'No secondary language' },
            ...languageOptions
          ]"
          :value="$store.getters['missionFormPersona/secondaryLanguage']"
          mutation="missionFormPersona/setSecondaryLanguage"
          placeholder="Select secondary language"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { LANGUAGES, LANGUAGE_LABELS } from '../../constants'
import Select from '../Select/Select'
export default {
  name: 'MissionPersonaCriteriaItemLanguage',
  components: { Select },
  computed: {
    languageOptions() {
      return Object.keys(LANGUAGES).map(language => ({
        value: language,
        label: LANGUAGE_LABELS[language]
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionPersonaCriteriaItemLanguage";
</style>
