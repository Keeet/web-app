<template>
  <div class="overlay-modal">
    <div class="overlay-modal-box">
      <div
        v-closable="{
          exclude: [],
          handler: 'close'
        }"
        class="overlay-modal-box-inner"
      >
        <div v-if="!noClose" class="overlay-modal-box-close" @click="close">
          <IconCancel />
        </div>
        <div class="overlay-modal-box-content">
          <p v-if="title" class="overlay-modal-box-content-title">
            {{ title }}
          </p>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverlayModal',
  props: {
    title: {
      type: String,
      required: true
    },
    noClose: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      if (!this.noClose) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "OverlayModal";
</style>
