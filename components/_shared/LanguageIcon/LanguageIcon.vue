<template>
  <div class="language-icon">
    <IconLanguageEnglish v-if="language === EN" />
    <IconLanguageGerman v-if="language === DE" />
  </div>
</template>

<script>
import { LANGUAGES } from '../../constants'

export default {
  name: 'LanguageIcon',
  props: {
    language: {
      type: String,
      required: true,
      validator: value => Object.keys(LANGUAGES).includes(value)
    }
  },
  data() {
    const { DE, EN } = LANGUAGES
    return { DE, EN }
  }
}
</script>

<style scoped lang="scss">
  @import "LanguageIcon";
</style>
