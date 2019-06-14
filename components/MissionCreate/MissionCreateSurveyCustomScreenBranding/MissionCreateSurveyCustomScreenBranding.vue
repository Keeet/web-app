<template>
  <div class="mission-create-survey-custom-screen-branding">
    <p class="mission-create-survey-custom-screen-branding-title">
      Branding
    </p>
    <Dropzone :mutation="logoIdMutation" />
  </div>
</template>

<script>
import Dropzone from '../../_shared/Dropzone/Dropzone'
export default {
  name: 'MissionCreateSurveyCustomScreenBranding',
  components: { Dropzone },
  props: {
    logoIdMutation: {
      type: String,
      required: true
    }
  },
  computed: {
    s() {
      return this.$store.state.missionFormSurvey
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyCustomScreenBranding";
</style>
