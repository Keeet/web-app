<template>
  <div class="confirm">
    <OverlayModal
      :title="title"
      :trigger-class="triggerClass"
      reduced-margins
      @close="cancel"
    >
      <p class="confirm-text">
        {{ text }}
      </p>
      <div class="confirm-labels">
        <ButtonText class="confirm-labels-confirm" :text="labelConfirm" @click="$emit('confirm', context)" />
        <ButtonText class="confirm-labels-cancel" :text="labelCancel" type="BLUE_BORDER" @click="cancel" />
      </div>
    </OverlayModal>
  </div>
</template>

<script>
import OverlayModal from '../OverlayModal/OverlayModal'
import ButtonText from '../ButtonText/ButtonText'
export default {
  name: 'Confirm',
  components: { ButtonText, OverlayModal },
  props: {
    title: {
      type: String,
      default: 'Are you sure?'
    },
    text: {
      type: String,
      required: true
    },
    labelConfirm: {
      type: String,
      default: 'Yes'
    },
    labelCancel: {
      type: String,
      default: 'No'
    },
    context: {
      type: Object,
      required: true
    },
    triggerClass: {
      type: String,
      default: null
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "Confirm";
</style>
