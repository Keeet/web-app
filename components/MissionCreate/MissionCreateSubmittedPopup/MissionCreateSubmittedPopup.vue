<template>
  <div class="mission-create-submitted-popup">
    <OverlayModal title="Next steps" @close="done">
      <IconClock />
      <p class="mission-create-submitted-popup-text">
        We have received your mission! It can take up to
        72 hours until we found fitting test users for you.
      </p>
      <IconProgress />
      <p class="mission-create-submitted-popup-text">
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
  name: 'MissionCreateSubmittedPopup',
  components: { ButtonText, OverlayModal },
  computed: {
    s() {
      return this.$store.state.missionForm
    }
  },
  methods: {
    done() {
      this.$router.push(`/projects/${this.s.projectId}`, () => {
        this.$store.commit('missionForm/hideSubmittedPopup')
        this.$store.commit('missionForm/submitted')
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSubmittedPopup";
</style>
