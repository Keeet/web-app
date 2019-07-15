<template>
  <div class="mission-survey-share">
    <MissionSurveyHeadline text="Get test results within hours!" />
    <MissionSurveyShareBox
      title="Keeet Panel"
      text="Test with our diverse panel of testers and gain insights in hours!"
    >
      <nuxt-link :to="`/missions/${mission.id}/order`">
        <ButtonText text="Place Order" no-margin />
      </nuxt-link>
    </MissionSurveyShareBox>
    <MissionSurveyShareBox
      title="Your audience"
      text="Share link with your own audience!"
    >
      <no-ssr>
        <div class="mission-survey-share-link">
          <div class="mission-survey-share-link-input">
            <Input :value="surveyLink" readonly no-margin />
          </div>
          <div class="mission-survey-share-link-copy">
            <ButtonText text="Copy Link" no-margin @click="copyLinkToClipboard" />
            <p
              class="mission-survey-share-link-copy-confirmation"
              :class="{ active: copied }"
            >
              copied
            </p>
          </div>
        </div>
      </no-ssr>
    </MissionSurveyShareBox>
  </div>
</template>

<script>
import MissionSurveyHeadline from '../MissionSurveyHeadline/MissionSurveyHeadline'
import MissionSurveyShareBox from '../MissionSurveyShareBox/MissionSurveyShareBox'
import ButtonText from '../../_shared/ButtonText/ButtonText'
import Input from '../../_shared/Input/Input'
export default {
  name: 'MissionSurveyShare',
  components: { Input, ButtonText, MissionSurveyShareBox, MissionSurveyHeadline },
  data() {
    return { copied: false }
  },
  computed: {
    mission() {
      return this.$store.state.mission
    },
    surveyLink() {
      if (process.server) {
        return
      }
      return `${window.location.origin}/survey/${this.mission.id}`
    }
  },
  methods: {
    copyLinkToClipboard() {
      const copyText = document.querySelector('.mission-survey-share-link-input input')
      copyText.select()
      document.execCommand('copy')
      if (!this.copied) {
        this.copied = true
        window.setTimeout(() => { this.copied = false }, 3000)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyShare";
</style>
