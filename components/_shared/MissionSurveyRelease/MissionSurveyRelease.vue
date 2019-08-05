<template>
  <Confirm
    :title="$t('shared.missionSurveyRelease.title', $store.state.locale)"
    :text="$t('shared.missionSurveyRelease.text', $store.state.locale)"
    :label-confirm="$t('shared.missionSurveyRelease.confirmLabel', $store.state.locale)"
    :label-cancel="$t('shared.missionSurveyRelease.cancelLabel', $store.state.locale)"
    full-width
    :loading="pending"
    @confirm="confirm"
    @close="cancel"
    @cancel="cancel"
  />
</template>

<script>
import Confirm from '../Confirm/Confirm'
import { MISSION_STATUS } from '../../constants'

export default {
  name: 'MissionSurveyRelease',
  components: { Confirm },
  data() {
    return { pending: false }
  },
  methods: {
    confirm() {
      const { id, type } = this.$store.state.mission
      this.pending = true
      this.$push.updateMissionStatus({
        id,
        type,
        status: MISSION_STATUS.RUNNING
      }).then(() => {
        this.pending = false
        this.$emit('close')
      })
    },
    cancel() {
      this.$emit('close')
    }
  }
}
</script>
