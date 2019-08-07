<template>
  <div class="mission-create-survey-details">
    <MissionCreateBox :headline="$t('missionCreate.survey.details.headline', $store.state.locale)">
      <Input
        :title="$t('missionCreate.survey.details.titleLabel', $store.state.locale)"
        :placeholder="s.titlePlaceholder"
        :value="s.title"
        :error="titleError"
        dispatch-error="missionForm/handleValidationError"
        :disable-error="!showError && !s.showErrors"
        mutation="missionForm/setTitle"
        @focusout="showError = true"
      />
      <div class="mission-create-survey-details-language">
        <Select
          :title="$t('missionCreate.survey.details.languageLabel', $store.state.locale)"
          :options="languageOptions"
          :value="s.survey.language"
          mutation="missionFormSurvey/setLanguage"
        />
      </div>
    </MissionCreateBox>
  </div>
</template>

<script>
import { LANGUAGE_LABELS, LANGUAGES_PLATFORM } from '../../constants'
import MissionCreateBox from '../MissionCreateBox/MissionCreateBox'
import Input from '../../_shared/Input/Input'
import Select from '../../_shared/Select/Select'
export default {
  name: 'MissionCreateSurveyDetails',
  components: { Select, Input, MissionCreateBox },
  data() {
    return { showError: false }
  },
  computed: {
    s() {
      const { missionForm, missionFormSurvey } = this.$store.state
      return {
        ...missionForm,
        survey: missionFormSurvey
      }
    },
    languageOptions() {
      return LANGUAGES_PLATFORM.map((language) => {
        return {
          label: LANGUAGE_LABELS[language],
          value: language
        }
      })
    },
    titleError() {
      if (!this.s.editExisting) {
        return
      }
      return this.s.title !== '' ? null : 'required'
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyDetails";
</style>
