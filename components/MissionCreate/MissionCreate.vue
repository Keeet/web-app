<template>
  <div class="mission-create">
    <div v-show="!s.pending" class="mission-create-body">
      <ButtonCircle class="mission-create-cancel" type="ARROW_LEFT" @click="cancel" />
      <MissionCreateType v-if="s.activeStep === 0" />
      <MissionCreateRecruit v-else-if="[MISSIONS.IN_HOUSE, MISSIONS.REMOTE].includes(s.type)" />
      <MissionCreateSurvey v-else-if="[MISSIONS.SURVEY, MISSIONS.USABILITY_LAB].includes(s.type)" @cancel="cancel" />
    </div>
    <Loading v-if="s.pending" fixed-center />
    <MissionCreateRecruitSubmittedPopup v-if="s.recruit.submittedPopup" />
    <Confirm
      v-if="s.confirmInProgressOpened"
      :title="$t('missionCreate.confirmInProgress.title', $store.state.locale)"
      :text="$t('missionCreate.confirmInProgress.text', $store.state.locale)"
      :label-confirm="$t('missionCreate.confirmInProgress.confirm', $store.state.locale)"
      :label-cancel="$t('missionCreate.confirmInProgress.cancel', $store.state.locale)"
      full-width
      @cancel="discardChanges"
      @close="discardChanges"
      @confirm="hideConfirmInProgress"
    />
  </div>
</template>

<script>
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
import { MISSIONS } from '../constants'
import Loading from '../_shared/Loading/Loading'
import Confirm from '../_shared/Confirm/Confirm'
import MissionCreateType from './MissionCreateType/MissionCreateType'
import MissionCreateSurvey from './MissionCreateSurvey/MissionCreateSurvey'
import MissionCreateRecruitSubmittedPopup
  from './MissionCreateRecruitSubmittedPopup/MissionCreateRecruitSubmittedPopup'
import MissionCreateRecruit from './MissionCreateRecruit/MissionCreateRecruit'

export default {
  name: 'MissionCreate',
  components: {
    Confirm,
    MissionCreateRecruit,
    MissionCreateRecruitSubmittedPopup,
    Loading,
    MissionCreateType,
    ButtonCircle,
    MissionCreateSurvey
  },
  data() {
    return {
      MISSIONS
    }
  },
  computed: {
    s() {
      const { missionForm, missionFormRecruit } = this.$store.state
      return {
        ...missionForm,
        recruit: missionFormRecruit
      }
    },
    activeStep() {
      return this.s.activeStep
    }
  },
  watch: {
    activeStep() {
      window.scrollTo(0, 0)
    }
  },
  mounted() {
    this.$ga.page(this.$router)
    if (this.s.activeStep > 0 && !this.s.editExisting) {
      this.$store.commit('missionForm/showConfirmInProgress')
    }
  },
  methods: {
    cancel() {
      if (this.s.activeStep === 0 || this.s.editExisting) {
        if (this.s.projectFirstMission) {
          this.$router.push('/')
        } else {
          this.$router.back()
        }
      } else {
        this.$store.commit('missionForm/previousStep')
      }
    },
    hideConfirmInProgress() {
      this.$store.commit('missionForm/hideConfirmInProgress')
    },
    discardChanges() {
      this.$store.commit('missionForm/setActiveStep', 0)
      this.$store.commit('missionForm/resetForm')
      this.hideConfirmInProgress()
    }
  }
}
</script>

<style scoped lang="scss">
 @import "MissionCreate";
</style>
