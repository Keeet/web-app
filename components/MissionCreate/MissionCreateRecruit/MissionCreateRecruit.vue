<template>
  <div>
    <MissionCreateRecruitStep
      :index="1"
    >
      <MissionCreateRecruitForm
        :show-errors="$store.state.missionForm.showErrors"
      />
    </MissionCreateRecruitStep>
    <MissionCreateRecruitStep
      :index="2"
    >
      <MissionCreateRecruitPersona />
    </MissionCreateRecruitStep>
    <MissionCreateRecruitStep
      :index="3"
      :subheadline="$t('missionCreate.recruit.calendar.headline', $store.state.locale)"
    >
      <MissionCreateRecruitCalendar />
    </MissionCreateRecruitStep>
    <MissionCreateRecruitStep
      :index="4"
      last
      @submit="submit"
    >
      <MissionCreateRecruitSummary />
      <BillingMissing
        v-if="$store.state.missionFormRecruit.billingModalOpened"
        :no-admin-text="$t('missionCreate.recruit.summary.billingMissionNoAdmin', $store.state.locale)"
        @hide="hideBillingMissing"
      />
    </MissionCreateRecruitStep>
  </div>
</template>

<script>
import MissionCreateRecruitForm from '../MissionCreateRecruitForm/MissionCreateRecruitForm'
import MissionCreateRecruitCalendar from '../MissionCreateRecruitCalendar/MissionCreateRecruitCalendar'
import MissionCreateRecruitSummary from '../MissionCreateRecruitSummary/MissionCreateRecruitSummary'
import MissionCreateRecruitStep from '../MissionCreateRecruitStep/MissionCreateRecruitStep'
import MissionCreateRecruitPersona from '../MissionCreateRecruitPersona/MissionCreateRecruitPersona'
import BillingMissing from '../../_shared/BillingMissing/BillingMissing'

export default {
  name: 'MissionCreateRecruit',
  components: {
    BillingMissing,
    MissionCreateRecruitPersona,
    MissionCreateRecruitStep,
    MissionCreateRecruitSummary,
    MissionCreateRecruitCalendar,
    MissionCreateRecruitForm
  },
  methods: {
    hideBillingMissing() {
      this.$mpApp.trackMissionForm('hideBillingMissing', this.$store)
      this.$store.commit('missionFormRecruit/hideBillingModal')
    },
    submit() {
      const { missionForm, missionFormPersona, company: { billingConfig } } = this.$store.state
      if (!billingConfig) {
        this.$mpApp.trackMissionForm('attemptSubmitWithoutBilling', this.$store)
        this.$store.commit('missionFormRecruit/showBillingModal')
        return
      }

      this.$mpApp.trackMissionForm('submit', this.$store)
      this.$store.commit('missionForm/pending')
      this.$store.dispatch('missionFormRecruit/submit', {
        missionForm,
        missionFormPersona
      }).then((id) => {
        this.$store.commit('missionForm/setSubmittedMissionId', id)
      })
    }
  }
}
</script>
