<template>
  <SurveyStep :button-text="buttonText" :button-link="buttonLink">
    <div class="survey-custom-screen">
      <div class="survey-custom-screen-logo">
        <ThumborImage
          v-if="sValues.logo"
          :width="300"
          :src="sValues.logo"
          auto-width
        />
        <img v-else-if="type === TYPES.WELCOME" src="../../../assets/img/welcomeEmoji.png" class="default">
        <img v-else-if="type === TYPES.CLOSING" src="../../../assets/img/thankYouEmoji.png" class="default">
      </div>
      <div class="survey-custom-screen-text">
        <h1 class="survey-custom-screen-text-headline">
          {{ sValues.title || defaultValues.title }}
        </h1>
        <p class="survey-custom-screen-text-description">
          {{ sValues.description || defaultValues.description }}
        </p>
      </div>
    </div>
  </SurveyStep>
</template>

<script>
import SurveyStep from '../SurveyStep/SurveyStep'
import { getCustomScreenDefaultValues } from '../../../utils/intlUtils'
import ThumborImage from '../../_shared/ThumborImage/ThumborImage'

const TYPES = {
  WELCOME: 'WELCOME',
  CLOSING: 'CLOSING'
}

export default {
  name: 'SurveyCustomScreen',
  components: { ThumborImage, SurveyStep },
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.keys(TYPES).includes(value)
    }
  },
  data() {
    return { TYPES }
  },
  computed: {
    s() {
      return this.$store.state.survey
    },
    sValues() {
      const {
        welcomeTitle,
        welcomeDescription,
        welcomeLogo,
        closingTitle,
        closingDescription,
        closingLogo
      } = this.s

      switch (this.type) {
        case TYPES.WELCOME:
          return {
            title: welcomeTitle,
            description: welcomeDescription,
            logo: welcomeLogo
          }
        case TYPES.CLOSING:
          return {
            title: closingTitle,
            description: closingDescription,
            logo: closingLogo
          }
      }
      return null
    },
    defaultValues() {
      return getCustomScreenDefaultValues.bind(this)(this.type, this.s.language)
    },
    buttonText() {
      switch (this.type) {
        case TYPES.WELCOME:
          return this.$t('survey.welcomeButton', this.s.language)
        case TYPES.CLOSING:
          if (this.s.redirectLink) {
            return this.$t('survey.closingButton', this.s.language)
          }
      }
      return null
    },
    buttonLink() {
      if (this.type === TYPES.CLOSING && this.s.redirectLink) {
        return this.s.redirectLink
      }
      return null
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SurveyCustomScreen";
</style>
