<template>
  <div class="mission-create-recruit-submitted-popup">
    <OverlayModal title="Next steps" @close="done">
      <IconClock />
      <p class="mission-create-recruit-submitted-popup-text">
        We have received your mission! It can take up to
        72 hours until we found fitting test users for you.
      </p>
      <IconProgress />
      <p class="mission-create-recruit-submitted-popup-text">
        We will keep you updated on our progress. If you
        have any questions do not hesitate to contact us.
      </p>
      <ButtonText text="Done" @click="done" />
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
      return this.$store.state.missionForm
    }
  },
  methods: {
    done() {
      this.$router.push(`/missions/${this.s.submittedMissionId}`, () => {
        this.$store.commit('missionForm/hideSubmittedPopup')
        this.$store.commit('missionForm/submitted')
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitSubmittedPopup";
</style>
