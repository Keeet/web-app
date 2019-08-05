<template>
  <div class="mission-survey-share">
    <MissionSurveyHeadline :text="$t('mission.survey.share.headline', $store.state.locale)" />
    <MissionSurveyShareBox
      :title="$t('mission.survey.share.keeetPanel.title', $store.state.locale)"
      :text="$t('mission.survey.share.keeetPanel.text', $store.state.locale)"
    >
      <template slot="right">
        <nuxt-link :to="`/missions/${mission.id}/order`">
          <ButtonText
            :text="$t('mission.survey.share.keeetPanel.orderButton', $store.state.locale)"
            no-margin
          />
        </nuxt-link>
      </template>
      <template slot="body">
        <div
          v-for="(order, x) in sortedOrders"
          :key="x"
          class="mission-survey-share-order"
        >
          <p class="mission-survey-share-order-created">
            {{ getFormattedOrderDate(order) }}
          </p>
          <MissionCountProgress
            :title="$t('mission.survey.share.keeetPanel.orderResponsesLabel', $store.state.locale)"
            :count-current="order.actualCount"
            :count-total="order.participants"
          />
        </div>
      </template>
    </MissionSurveyShareBox>
    <MissionSurveyShareBox
      :title="$t('mission.survey.share.companyAudience.title', $store.state.locale)"
      :text="$t('mission.survey.share.companyAudience.text', $store.state.locale)"
    >
      <MissionSurveyRelease
        v-if="missionPage.surveyReleaseOpened"
        @close="$store.commit('missionPage/hideSurveyRelease')"
      />
      <ButtonText
        v-if="isDraft"
        :text="$t('mission.survey.share.companyAudience.createPublicLinkButton', $store.state.locale)"
        @click="$store.commit('missionPage/showSurveyRelease')"
      />
      <no-ssr v-else>
        <div class="mission-survey-share-link">
          <div class="mission-survey-share-link-input">
            <Input :value="surveyLink" readonly no-margin />
          </div>
          <div class="mission-survey-share-link-copy">
            <ButtonText :text="$t('mission.survey.share.companyAudience.copyLinkButton', $store.state.locale)" no-margin @click="copyLinkToClipboard" />
            <p
              class="mission-survey-share-link-copy-confirmation"
              :class="{ active: copied }"
            >
              {{ $t('mission.survey.share.companyAudience.copyLinkSuccessfulMessage', $store.state.locale) }}
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
import MissionSurveyRelease from '../../_shared/MissionSurveyRelease/MissionSurveyRelease'
import MissionCountProgress from '../MissionCountProgress/MissionCountProgress'
import { MISSION_STATUS } from '../../constants'
import { getLocaleDateString } from '../../../utils/dateUtils'

export default {
  name: 'MissionSurveyShare',
  components: { MissionSurveyRelease, Input, ButtonText, MissionSurveyShareBox, MissionSurveyHeadline, MissionCountProgress },
  data() {
    return { copied: false }
  },
  computed: {
    mission() {
      return this.$store.state.mission
    },
    missionPage() {
      return this.$store.state.missionPage
    },
    surveyLink() {
      if (process.server) {
        return
      }
      return `${window.location.origin}/survey/${this.mission.id}`
    },
    sortedOrders() {
      return this.mission.orders
        .slice()
        .sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)
    },
    isDraft() {
      return this.mission.status === MISSION_STATUS.DRAFT
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
    },
    getFormattedOrderDate(order) {
      const d = new Date(order.createdAt.toString())
      return getLocaleDateString(d)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyShare";
</style>
