<template>
  <div class="overlay-modal">
    <div
      data-aos="fade-up"
      data-aos-duration="1000"
      :data-aos-once="true"
    >
      <div class="overlay-modal-box">
        <div class="overlay-modal-box-inner">
          <div v-show="loading" class="overlay-modal-box-loading" :class="{active: loading}">
            <Loading />
          </div>
          <div v-if="!noClose" class="overlay-modal-box-close" @click="close">
            <IconCancel />
          </div>
          <div class="overlay-modal-box-content" :class="{hidden: loading, reducedMargins}">
            <p v-if="title" class="overlay-modal-box-content-title" :class="{reducedMargins}">
              {{ title }}
            </p>
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../Loading/Loading'
export default {
  name: 'OverlayModal',
  components: { Loading },
  props: {
    title: {
      type: String,
      required: true
    },
    noClose: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    triggerClass: {
      type: String,
      default: null
    },
    reducedMargins: {
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
