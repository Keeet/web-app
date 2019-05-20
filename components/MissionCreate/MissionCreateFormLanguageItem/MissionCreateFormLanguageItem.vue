<template>
  <div
    class="mission-create-form-language-item"
    :class="{ active }"
    @click="$store.commit('missionForm/setLanguage', language)"
  >
    <div class="mission-create-form-language-item-icon">
      <IconLanguageEnglish v-if="language === EN" />
      <IconLanguageGerman v-if="language === DE" />
    </div>
    <div class="mission-create-form-language-item-text">
      {{ LANGUAGE_LABELS[language] }}
    </div>
  </div>
</template>

<script>
const LANGUAGES = {
  DE: 'DE',
  EN: 'EN'
}
const LANGUAGE_LABELS = {
  DE: 'German',
  EN: 'English'
}
export default {
  name: 'MissionCreateFormLanguageItem',
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
    const { DE, EN } = LANGUAGES
    return { DE, EN, LANGUAGE_LABELS }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateFormLanguageItem";
</style>
