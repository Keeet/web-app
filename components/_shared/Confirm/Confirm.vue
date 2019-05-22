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
        <ButtonText
          class="confirm-labels-confirm"
          :class="{ fullWidth }"
          :text="labelConfirm"
          :arrow="labelConfirmArrow"
          @click="$emit('confirm')"
        />
        <ButtonText
          v-if="labelCancel"
          class="confirm-labels-cancel"
          :class="{ fullWidth }"
          :text="labelCancel"
          type="BLUE_BORDER"
          @click="$emit('cancel')"
        />
      </div>
    </OverlayModal>
  </div>
</template>

<script>
import OverlayModal from '../OverlayModal/OverlayModal'
import ButtonText from '../ButtonText/ButtonText'

const ARROWS = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
}

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
    labelConfirmArrow: {
      type: String,
      default: null,
      validator: value => Object.values(ARROWS).includes(value)
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
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "Confirm";
</style>
