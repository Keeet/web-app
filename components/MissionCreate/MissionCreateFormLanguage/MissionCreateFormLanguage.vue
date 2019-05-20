<template>
  <div class="mission-create-form-language">
    <MissionCreateFormLanguageItem
      v-for="(language, x) in ['DE', 'EN']"
      :key="x"
      :language="language"
      :active="s.language === language"
      @click="$store.commit('missionForm/setLanguage', language)"
    />
  </div>
</template>

<script>
import MissionCreateFormLanguageItem from '../MissionCreateFormLanguageItem/MissionCreateFormLanguageItem'

export default {
  name: 'MissionCreateFormLanguage',
  components: { MissionCreateFormLanguageItem },
  computed: {
    s() {
      return this.$store.state.missionForm
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateFormLanguage";
</style>
