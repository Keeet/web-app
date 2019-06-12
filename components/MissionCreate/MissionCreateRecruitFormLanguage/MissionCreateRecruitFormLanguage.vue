<template>
  <div class="mission-create-recruit-form-language">
    <MissionCreateRecruitFormLanguageItem
      v-for="(language, x) in ['DE', 'EN']"
      :key="x"
      :language="language"
      :active="s.language === language"
      @click="$store.commit('missionForm/setLanguage', language)"
    />
  </div>
</template>

<script>
import MissionCreateRecruitFormLanguageItem from '../MissionCreateRecruitFormLanguageItem/MissionCreateRecruitFormLanguageItem'

export default {
  name: 'MissionCreateRecruitFormLanguage',
  components: { MissionCreateRecruitFormLanguageItem },
  computed: {
    s() {
      const { missionForm, missionFormRecruit } = this.$store.state
      return {
        ...missionForm,
        recruit: missionFormRecruit
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitFormLanguage";
</style>
