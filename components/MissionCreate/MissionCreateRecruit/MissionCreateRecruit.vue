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
      subheadline="When are you able to conduct the interview / test?"
    >
      <MissionCreateRecruitCalendar />
    </MissionCreateRecruitStep>
    <MissionCreateRecruitStep
      :index="4"
      last
      @submit="submit"
    >
      <MissionCreateRecruitSummary />
    </MissionCreateRecruitStep>
    <Confirm
      v-if="!$store.state.company.billingConfig"
      title="Billing address missing"
      text="You have to add a billing address before you can create In-House and Remote missions."
      label-confirm="Add billing address"
      label-cancel="Cancel"
      full-width
      no-close
      @confirm="$router.push('/account/billing')"
      @cancel="$store.commit('missionForm/previousStep')"
    />
  </div>
</template>

<script>
import MissionCreateRecruitForm from '../MissionCreateRecruitForm/MissionCreateRecruitForm'
import MissionCreateRecruitCalendar from '../MissionCreateRecruitCalendar/MissionCreateRecruitCalendar'
import MissionCreateRecruitSummary from '../MissionCreateRecruitSummary/MissionCreateRecruitSummary'
import MissionCreateRecruitStep from '../MissionCreateRecruitStep/MissionCreateRecruitStep'
import MissionCreateRecruitPersona from '../MissionCreateRecruitPersona/MissionCreateRecruitPersona'
import Confirm from '../../_shared/Confirm/Confirm'

export default {
  name: 'MissionCreateRecruit',
  components: {
    Confirm,
    MissionCreateRecruitPersona,
    MissionCreateRecruitStep,
    MissionCreateRecruitSummary,
    MissionCreateRecruitCalendar,
    MissionCreateRecruitForm
  },
  methods: {
    submit() {
      const { missionForm, missionFormPersona } = this.$store.state
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
