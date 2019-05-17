<template>
  <div class="headline" :class="{center, hasSubline: subline !== null}">
    <h1 class="headline-main">
      {{ text }}
    </h1>
    <p class="headline-subline">
      {{ subline }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Headline',
  props: {
    text: {
      type: String,
      required: true
    },
    subline: {
      type: String,
      default: null
    },
    center: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "Headline";
</style>
