<template>
  <div class="mission-create-survey-details">
    <MissionCreateBox headline="Mission Details">
      <Input
        title="Internal mission name"
        placeholder="Test campaign"
        :value="s.title"
        mutation="missionForm/setTitle"
      />
      <div class="mission-create-survey-details-language">
        <Select
          title="Language*"
          :options="getLanguageOptions(['DE', 'EN', 'FR', 'ES', 'IT'])"
          :value="s.language"
          mutation="missionForm/setLanguage"
        />
      </div>
    </MissionCreateBox>
  </div>
</template>

<script>
import { LANGUAGE_LABELS } from '../../constants'
import MissionCreateBox from '../MissionCreateBox/MissionCreateBox'
import Input from '../../_shared/Input/Input'
import Select from '../../_shared/Select/Select'
export default {
  name: 'MissionCreateSurveyDetails',
  components: { Select, Input, MissionCreateBox },
  computed: {
    s() {
      return this.$store.state.missionForm
    }
  },
  methods: {
    getLanguageOptions(languages) {
      return languages.map((language) => {
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
