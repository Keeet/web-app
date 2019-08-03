<template>
  <img
    class="thumbor-image"
    :class="{ autoWidth }"
    :src="thumborUrl"
    :title="title"
    @load="$emit('load')"
  >
</template>

<script>
export default {
  name: 'ThumborImage',
  props: {
    src: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: null
    },
    autoWidth: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    thumborUrl() {
      const src = this.src.startsWith('/') ? `${process.env.selfBaseUrl}${this.src}` : this.src
      return `https://images.keeet.io/unsafe/${this.width}x${this.height}/${encodeURIComponent(src)}`
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "ThumborImage";
</style>
