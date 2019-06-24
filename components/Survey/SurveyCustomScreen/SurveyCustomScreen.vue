<template>
  <SurveyStep :button-text="buttonText">
    <div class="survey-custom-screen">
      <div class="survey-custom-screen-logo">
        <img v-if="!sValues.logo" :src="sValues.logo">
        <img v-else-if="type === TYPES.WELCOME" src="../../../assets/img/welcomeEmoji.png" class="default">
        <img v-else-if="type === TYPES.CLOSING" src="../../../assets/img/thankYouEmoji.png" class="default">
      </div>
      <div class="survey-custom-screen-text">
        <h1 class="survey-custom-screen-text-headline">
          {{ sValues.title }}
        </h1>
        <p class="survey-custom-screen-text-description">
          {{ sValues.description }}
        </p>
      </div>
    </div>
  </SurveyStep>
</template>

<script>
import SurveyStep from '../SurveyStep/SurveyStep'

const TYPES = {
  WELCOME: 'WELCOME',
  CLOSING: 'CLOSING'
}

export default {
  name: 'SurveyCustomScreen',
  components: { SurveyStep },
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.values(TYPES).includes(value)
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
    buttonText() {
      switch (this.type) {
        case TYPES.WELCOME:
          return 'Start'
        case TYPES.CLOSING:
          return 'Finish'
      }
      return null
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SurveyCustomScreen";
</style>
