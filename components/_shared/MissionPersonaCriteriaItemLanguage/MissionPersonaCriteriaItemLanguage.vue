<template>
  <div class="mission-persona-criteria-item-language">
    <p class="mission-persona-criteria-item-language-title">
      {{ $t('shared.missionPersonaCriteria.language.selectSecondaryCosts', $store.state.locale) }}
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
            { value: null, label: $t('shared.missionPersonaCriteria.language.selectSecondaryNullLabel', $store.state.locale) },
            ...languageOptions
          ]"
          :value="$store.getters['missionFormPersona/secondaryLanguage']"
          mutation="missionFormPersona/setSecondaryLanguage"
          :placeholder="$t('shared.missionPersonaCriteria.language.selectSecondaryLabel', $store.state.locale)"
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
