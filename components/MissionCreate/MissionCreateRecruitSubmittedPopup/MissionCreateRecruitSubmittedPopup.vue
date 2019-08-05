<template>
  <div class="mission-create-recruit-submitted-popup">
    <OverlayModal
      :title="$t('missionCreate.recruit.submittedPopup.title', $store.state.locale)"
      @close="done"
    >
      <IconClockBlue />
      <p class="mission-create-recruit-submitted-popup-text">
        {{ $t('missionCreate.recruit.submittedPopup.text1', $store.state.locale) }}
      </p>
      <IconProgress />
      <p class="mission-create-recruit-submitted-popup-text">
        {{ $t('missionCreate.recruit.submittedPopup.text2', $store.state.locale) }}
      </p>
      <ButtonText
        :text="$t('missionCreate.recruit.submittedPopup.button', $store.state.locale)"
        @click="done"
      />
    </OverlayModal>
  </div>
</template>

<script>
import OverlayModal from '../../_shared/OverlayModal/OverlayModal'
import ButtonText from '../../_shared/ButtonText/ButtonText'
export default {
  name: 'MissionCreateRecruitSubmittedPopup',
  components: { ButtonText, OverlayModal },
  computed: {
    s() {
      const { missionForm, missionFormRecruit } = this.$store.state
      return {
        ...missionForm,
        recruit: missionFormRecruit
      }
    }
  },
  beforeDestroy() {
    this.$store.commit('missionFormRecruit/reset')
    this.$store.commit('missionForm/reset')
  },
  methods: {
    done() {
      this.$router.push(`/missions/${this.s.submittedMissionId}`)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitSubmittedPopup";
</style>
