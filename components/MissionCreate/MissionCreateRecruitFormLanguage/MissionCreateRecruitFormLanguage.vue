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
      return this.$store.state.missionForm
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitFormLanguage";
</style>
