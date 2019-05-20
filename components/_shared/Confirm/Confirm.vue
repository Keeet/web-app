<template>
  <div class="confirm">
    <OverlayModal
      :title="title"
      :trigger-class="triggerClass"
      :loading="loading"
      reduced-margins
      @close="$emit('close')"
    >
      <p class="confirm-text">
        {{ text }}
      </p>
      <div class="confirm-labels">
        <ButtonText class="confirm-labels-confirm" :text="labelConfirm" @click="$emit('confirm')" />
        <ButtonText class="confirm-labels-cancel" :text="labelCancel" type="BLUE_BORDER" @click="$emit('cancel')" />
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
    triggerClass: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "Confirm";
</style>
