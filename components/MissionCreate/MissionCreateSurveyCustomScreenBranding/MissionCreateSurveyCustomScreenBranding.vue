<template>
  <div class="mission-create-survey-custom-screen-branding">
    <p class="mission-create-survey-custom-screen-branding-title">
      Branding
    </p>
    <div class="mission-create-survey-custom-screen-branding-dropzone">
      <Dropzone :mutation="logoIdMutation" :thumbnail-width="400">
        <template slot="empty">
          <div class="mission-create-survey-custom-screen-branding-dropzone-empty">
            <IconFileImage />
            <p class="mission-create-survey-custom-screen-branding-dropzone-empty-text">
              Upload a photo / logo
            </p>
          </div>
        </template>
      </Dropzone>
    </div>
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

<style lang="scss">
  @import "MissionCreateSurveyCustomScreenBranding";
</style>
