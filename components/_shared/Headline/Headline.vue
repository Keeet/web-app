<template>
  <h1 class="headline" :class="{center}">
    {{ text }}
  </h1>
</template>

<script>
export default {
  name: 'Headline',
  props: {
    text: {
      type: String,
      required: true
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
