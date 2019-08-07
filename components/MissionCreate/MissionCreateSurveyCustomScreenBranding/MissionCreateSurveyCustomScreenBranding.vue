<template>
  <div class="mission-create-survey-custom-screen-branding">
    <p class="mission-create-survey-custom-screen-branding-title">
      {{ $t('missionCreate.survey.customScreens.logoLabel', $store.state.locale) }}
    </p>
    <div class="mission-create-survey-custom-screen-branding-dropzone">
      <Dropzone :path="MEDIA_UPLOAD_PATH.MISSION" :mutation="logoIdMutation" :thumbnail-width="200" :thumbnail-height="200">
        <template slot="empty">
          <div class="mission-create-survey-custom-screen-branding-dropzone-empty">
            <IconFileImage />
            <p class="mission-create-survey-custom-screen-branding-dropzone-empty-text">
              {{ $t('missionCreate.survey.customScreens.logoUpload', $store.state.locale) }}
            </p>
          </div>
        </template>
      </Dropzone>
    </div>
  </div>
</template>

<script>
import { MEDIA_UPLOAD_PATH } from '../../constants'
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
  data() {
    return { MEDIA_UPLOAD_PATH }
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
