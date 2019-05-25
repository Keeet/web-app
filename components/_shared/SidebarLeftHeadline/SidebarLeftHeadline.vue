<template>
  <p class="sidebar-left-headline">
    {{ text }}
  </p>
</template>

<script>
export default {
  name: 'SidebarLeftHeadline',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SidebarLeftHeadline";
</style>
