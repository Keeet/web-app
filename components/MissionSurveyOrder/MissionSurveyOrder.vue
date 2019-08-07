<template>
  <div class="mission-survey-order">
    <ButtonCircle class="mission-survey-order-cancel" type="ARROW_LEFT" @click="$router.back()" />
    <div class="mission-survey-order-body">
      <div class="mission-survey-order-body-content">
        <div class="mission-survey-order-body-content-head">
          <MissionSurveyOrderParticipants />
          <MissionSurveyOrderCountry />
        </div>
        <MissionPersonaCriteria
          :criteria="[PERSONA_CRITERIA.AGE, PERSONA_CRITERIA.GENDER]"
        />
      </div>
      <MissionOrderSummary
        v-if="s.survey.items.length"
        :mission-type="mission.type"
        :price-checksum="priceChecksum"
        wrapper-class="mission-survey-order-body"
        @cancel="cancel"
        @submit="submit"
      />
    </div>
    <BillingMissing
      v-if="missionPage.surveyOrderBillingAddressOpened"
      :no-admin-text="$t('missionSurveyOrder.billingMissionNoAdmin', $store.state.locale)"
      @hide="$store.commit('missionPage/hideSurveyOrderBillingAddress')"
    />
    <MissionSurveyRelease
      v-if="missionPage.surveyReleaseOpened"
      @close="$store.commit('missionPage/hideSurveyRelease')"
    />
  </div>
</template>

<script>
import {
  PERSONA_GENDERS,
  PERSONA_GENDER_LABELS,
  COUNTRY_LABELS,
  PERSONA_CRITERIA,
  MISSION_STATUS
} from '../constants'
import MissionPersonaCriteria from '../_shared/MissionPersonaCriteria/MissionPersonaCriteria'
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
import MissionOrderSummary from '../_shared/MissionOrderSummary/MissionOrderSummary'
import BillingMissing from '../_shared/BillingMissing/BillingMissing'
import MissionSurveyRelease from '../_shared/MissionSurveyRelease/MissionSurveyRelease'
import MissionSurveyOrderParticipants from './MissionSurveyOrderParticipants/MissionSurveyOrderParticipants'
import MissionSurveyOrderCountry from './MissionSurveyOrderCountry/MissionSurveyOrderCountry'

export default {
  name: 'MissionSurveyOrder',
  components: { MissionSurveyRelease, BillingMissing, MissionSurveyOrderCountry, MissionOrderSummary, ButtonCircle, MissionSurveyOrderParticipants, MissionPersonaCriteria },
  data() {
    return { PERSONA_GENDERS, PERSONA_GENDER_LABELS, COUNTRY_LABELS, PERSONA_CRITERIA }
  },
  computed: {
    mission() {
      return this.$store.state.mission
    },
    s() {
      const { missionForm, missionFormPersona, missionFormSurvey } = this.$store.state
      return {
        ...missionForm,
        persona: missionFormPersona,
        survey: missionFormSurvey
      }
    },
    priceChecksum() {
      return this.$store.getters['missionFormSurvey/pricingChecksum']({
        missionForm: this.s
      })
    },
    missionPage() {
      return this.$store.state.missionPage
    }
  },
  mounted() {
    this.$ga.page(this.$router)
  },
  methods: {
    buildOrderRequest() {
      const { participants } = this.s
      return {
        participants,
        demographicData: this.s.persona
      }
    },
    cancel() {
      this.$mpAppHelper.trackMissionSurveyOrder('abort', this.$store)
      this.$router.push(`/missions/${this.mission.id}/share`)
    },
    submit() {
      if (!this.$store.state.company.billingConfig) {
        this.$mpAppHelper.trackMissionSurveyOrder('attemptSubmitWithoutBillingAddress', this.$store)
        this.$store.commit('missionPage/showSurveyOrderBillingAddress')
        return
      }
      if (this.mission.status === MISSION_STATUS.DRAFT) {
        this.$mpAppHelper.trackMissionSurveyOrder('attemptSubmitDraft', this.$store)
        this.$store.commit('missionPage/showSurveyRelease')
        return
      }
      this.$mpAppHelper.trackMissionSurveyOrder('submit', this.$store)
      this.$push.submitMissionOrder({
        ...this.buildOrderRequest(),
        missionId: this.mission.id
      }).then(() => {
        this.$router.push(`/missions/${this.mission.id}`)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyOrder";
</style>
