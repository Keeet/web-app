<template>
  <div class="mission-create-survey-custom-screen">
    <MissionCreateBox>
      <div class="mission-create-survey-custom-screen-head">
        <div class="mission-create-survey-custom-screen-head-icon">
          <img v-if="type === TYPES.WELCOME" src="../../../assets/img/welcomeEmoji.png">
          <img v-else-if="type === TYPES.CLOSING" src="../../../assets/img/thankYouEmoji.png">
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
      <div v-show="sValues.opened" class="mission-create-survey-custom-screen-body">
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
            v-if="type === TYPES.CLOSING"
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

const TYPES = {
  WELCOME: 'WELCOME',
  CLOSING: 'CLOSING'
}

const MUTATIONS = {
  WELCOME: {
    reset: 'missionFormSurvey/resetWelcomeScreen',
    switchCustomize: 'missionFormSurvey/switchCustomizeWelcome',
    setTitle: 'missionFormSurvey/setWelcomeTitle',
    setDescription: 'missionFormSurvey/setWelcomeDescription',
    setLogoId: 'missionFormSurvey/setWelcomeLogoId',
    openColorPicker: 'missionFormSurvey/openWelcomeColorPicker',
    closeColorPicker: 'missionFormSurvey/closeWelcomeColorPicker'
  },
  CLOSING: {
    reset: 'missionFormSurvey/resetClosingScreen',
    switchCustomize: 'missionFormSurvey/switchCustomizeClosing',
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
      validator: value => Object.keys(TYPES).includes(value)
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
    return { TYPES }
  },
  computed: {
    s() {
      return this.$store.state.missionFormSurvey
    },
    sValues() {
      switch (this.type) {
        case TYPES.WELCOME:
          return {
            opened: this.s.customizeWelcome,
            title: this.s.welcomeTitle,
            description: this.s.welcomeDescription,
            logoId: this.s.welcomeLogoId,
            colorPickerOpened: this.s.welcomeColorPickerOpened
          }
        case TYPES.CLOSING:
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
    }
  },
  methods: {
    switchCustomize() {
      this.$store.commit(this.mutations.switchCustomize)
      if (!this.sValues.opened) {
        this.$store.commit(this.mutations.reset)
        if (!this.s.customizeWelcome && !this.s.customizeClosing) {
          this.$store.commit('missionFormSurvey/resetColor')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyCustomScreen";
</style>
