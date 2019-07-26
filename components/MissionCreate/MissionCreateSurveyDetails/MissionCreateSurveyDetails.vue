<template>
  <div class="mission-create-survey-details">
    <MissionCreateBox headline="Mission Details">
      <Input
        title="Internal mission name"
        :placeholder="s.titlePlaceholder"
        :value="s.title"
        mutation="missionForm/setTitle"
        @focusout="showError = true"
      />
      <div class="mission-create-survey-details-language">
        <Select
          title="Language*"
          :options="languageOptions"
          :value="s.survey.language"
          mutation="missionFormSurvey/setLanguage"
        />
      </div>
    </MissionCreateBox>
  </div>
</template>

<script>
import { LANGUAGES, LANGUAGE_LABELS } from '../../constants'
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
      const { DE, EN, FR, ES } = LANGUAGES
      return [DE, EN, FR, ES].map((language) => {
        return {
          label: LANGUAGE_LABELS[language],
          value: language
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyDetails";
</style>
