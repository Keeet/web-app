<template>
  <div class="mission-create-survey-custom-screen-branding">
    <p class="mission-create-survey-custom-screen-branding-title">
      {{ $t('missionCreate.survey.customScreens.logoLabel', $store.state.locale) }}
    </p>
    <div class="mission-create-survey-custom-screen-branding-dropzone">
      <Dropzone
        :path="MEDIA_UPLOAD_PATH.MISSION"
        :mutation="logoIdMutation"
        :thumbnail-width="200"
        :thumbnail-height="200"
        :already-uploaded-files="alreadyUploadedFile"
        dispatch-error="missionForm/handleValidationError"
      >
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
import { MEDIA_UPLOAD_PATH, MISSION_SURVEY_CUSTOM_SCREEN_TYPES } from '../../constants'
import Dropzone from '../../_shared/Dropzone/Dropzone'

const {
  WELCOME,
  CLOSING
} = MISSION_SURVEY_CUSTOM_SCREEN_TYPES

export default {
  name: 'MissionCreateSurveyCustomScreenBranding',
  components: { Dropzone },
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.keys(MISSION_SURVEY_CUSTOM_SCREEN_TYPES).includes(value)
    },
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
    },
    alreadyUploadedFile() {
      const { welcomeLogo, closingLogo } = this.s
      if (this.type === WELCOME && welcomeLogo) {
        return {
          id: welcomeLogo.id,
          url: welcomeLogo.spacesUrl
        }
      }
      if (this.type === CLOSING && closingLogo) {
        return {
          id: closingLogo.id,
          url: closingLogo.spacesUrl
        }
      }
      return null
    }
  }
}
</script>

<style lang="scss">
  @import "MissionCreateSurveyCustomScreenBranding";
</style>
