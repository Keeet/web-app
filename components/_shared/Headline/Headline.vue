<template>
  <h1 class="headline">
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
    }
  }
}
</script>

<style scoped lang="scss">
  @import "Headline";
</style>
