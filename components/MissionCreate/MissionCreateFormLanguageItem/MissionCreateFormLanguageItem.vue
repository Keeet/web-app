<template>
  <div
    class="mission-create-form-language-item"
    :class="{ active }"
    @click="$store.commit('missionForm/setLanguage', language)"
  >
    <div class="mission-create-form-language-item-icon">
      <LanguageIcon :language="language" />
    </div>
    <div class="mission-create-form-language-item-text">
      {{ LANGUAGE_LABELS[language] }}
    </div>
  </div>
</template>

<script>
import { LANGUAGES, LANGUAGE_LABELS } from '../../constants'
import LanguageIcon from '../../_shared/LanguageIcon/LanguageIcon'

export default {
  name: 'MissionCreateFormLanguageItem',
  components: { LanguageIcon },
  props: {
    language: {
      type: String,
      required: true,
      validator: value => Object.values(LANGUAGES).includes(value)
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { LANGUAGE_LABELS }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateFormLanguageItem";
</style>
