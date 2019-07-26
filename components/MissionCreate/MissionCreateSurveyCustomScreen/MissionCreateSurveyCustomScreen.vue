<template>
  <div class="mission-create-survey-custom-screen">
    <MissionCreateBox>
      <div class="mission-create-survey-custom-screen-head">
        <div class="mission-create-survey-custom-screen-head-icon">
          <img v-if="type === WELCOME" src="../../../assets/img/welcomeEmoji.png">
          <img v-else-if="type === CLOSING" src="../../../assets/img/thankYouEmoji.png">
        </div>
        <div class="mission-create-survey-custom-screen-head-text">
          <p class="mission-create-survey-custom-screen-head-text-headline">
            {{ title }}
          </p>
          <p class="mission-create-survey-custom-screen-head-text-subheadline">
            {{ subtitle }}
          </p>
        </div>
        <SwitchButton
          :on="sValues.opened"
          label="Customize"
          @switch="switchCustomize"
        />
      </div>
      <div v-if="sValues.opened" class="mission-create-survey-custom-screen-body">
        <div class="mission-create-survey-custom-screen-body-left">
          <Input
            :value="sValues.title"
            :mutation="mutations.setTitle"
            title="Title"
            :error="titleError"
            dispatch-error="missionForm/handleValidationError"
          />
          <Input
            :value="sValues.description"
            :mutation="mutations.setDescription"
            title="Message"
            :error="descriptionError"
            dispatch-error="missionForm/handleValidationError"
            textarea
          />
          <Input
            v-if="type === CLOSING"
            :value="s.redirectLink || ''"
            mutation="missionFormSurvey/setRedirectLink"
            title="Redirect Link"
            placeholder="https://"
            :error="redirectLinkError"
            dispatch-error="missionForm/handleValidationError"
          />
        </div>
        <div class="mission-create-survey-custom-screen-body-right">
          <MissionCreateSurveyCustomScreenBranding
            :logo-id-mutation="mutations.setLogoId"
          />
          <MissionCreateSurveyCustomScreenColor
            :color-picker-opened="sValues.colorPickerOpened"
            :open-color-picker-mutation="mutations.openColorPicker"
            :close-color-picker-mutation="mutations.closeColorPicker"
          />
        </div>
      </div>
    </MissionCreateBox>
  </div>
</template>

<script>
import MissionCreateBox from '../MissionCreateBox/MissionCreateBox'
import SwitchButton from '../../_shared/SwitchButton/SwitchButton'
import Input from '../../_shared/Input/Input'
import MissionCreateSurveyCustomScreenColor
  from '../MissionCreateSurveyCustomScreenColor/MissionCreateSurveyCustomScreenColor'
import MissionCreateSurveyCustomScreenBranding
  from '../MissionCreateSurveyCustomScreenBranding/MissionCreateSurveyCustomScreenBranding'
import { isHttpsLink } from '../../../utils/stringUtils'
import { MISSION_SURVEY_CUSTOM_SCREEN_TYPES } from '../../constants'
import { getCustomScreenDefaultValues } from '../../../utils/intlUtils'

const {
  WELCOME,
  CLOSING
} = MISSION_SURVEY_CUSTOM_SCREEN_TYPES

const MUTATIONS = {
  WELCOME: {
    setTitle: 'missionFormSurvey/setWelcomeTitle',
    setDescription: 'missionFormSurvey/setWelcomeDescription',
    setLogoId: 'missionFormSurvey/setWelcomeLogoId',
    openColorPicker: 'missionFormSurvey/openWelcomeColorPicker',
    closeColorPicker: 'missionFormSurvey/closeWelcomeColorPicker'
  },
  CLOSING: {
    setTitle: 'missionFormSurvey/setClosingTitle',
    setDescription: 'missionFormSurvey/setClosingDescription',
    setLogoId: 'missionFormSurvey/setClosingLogoId',
    openColorPicker: 'missionFormSurvey/openClosingColorPicker',
    closeColorPicker: 'missionFormSurvey/closeClosingColorPicker'
  }
}

export default {
  name: 'MissionCreateSurveyCustomScreen',
  components: { MissionCreateSurveyCustomScreenBranding, MissionCreateSurveyCustomScreenColor, Input, SwitchButton, MissionCreateBox },
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.keys(MISSION_SURVEY_CUSTOM_SCREEN_TYPES).includes(value)
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    }
  },
  data() {
    return { WELCOME, CLOSING }
  },
  computed: {
    s() {
      return this.$store.state.missionFormSurvey
    },
    sValues() {
      switch (this.type) {
        case WELCOME:
          return {
            opened: this.s.customizeWelcome,
            title: this.s.welcomeTitle,
            description: this.s.welcomeDescription,
            logoId: this.s.welcomeLogoId,
            colorPickerOpened: this.s.welcomeColorPickerOpened
          }
        case CLOSING:
          return {
            opened: this.s.customizeClosing,
            title: this.s.closingTitle,
            description: this.s.closingDescription,
            logoId: this.s.closingLogoId,
            colorPickerOpened: this.s.closingColorPickerOpened
          }
      }
      return null
    },
    mutations() {
      return MUTATIONS[this.type]
    },
    titleError() { return this.sValues.title !== '' ? null : 'required' },
    descriptionError() { return this.sValues.description !== '' ? null : 'required' },
    redirectLinkError() {
      const link = this.s.redirectLink
      return !link || isHttpsLink(link) ? null : 'invalid link (must start with https://)'
    },
    language() {
      return this.s.language
    }
  },
  watch: {
    language(newLanguage, oldLanguage) {
      const currentLanguageValues = getCustomScreenDefaultValues.bind(this)(this.type, oldLanguage)
      const newLanguageValues = getCustomScreenDefaultValues.bind(this)(this.type, newLanguage)

      const titleIsStillDefault = currentLanguageValues.title === this.sValues.title
      const descriptionIsStillDefault = currentLanguageValues.description === this.sValues.description
      if (titleIsStillDefault) {
        this.$store.commit(this.mutations.setTitle, newLanguageValues.title)
      }
      if (descriptionIsStillDefault) {
        this.$store.commit(this.mutations.setDescription, newLanguageValues.description)
      }
    }
  },
  methods: {
    switchCustomize() {
      this.$store.dispatch(
        'missionFormSurvey/switchCustomize',
        {
          type: this.type,
          defaultValues: getCustomScreenDefaultValues.bind(this)(this.type, this.language)
        }
      )
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyCustomScreen";
</style>
