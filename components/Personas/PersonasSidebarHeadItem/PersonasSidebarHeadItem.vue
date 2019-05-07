<template>
  <div class="personas-sidebar-head-item">
    <p class="personas-sidebar-head-item-value">
      {{ value }}
    </p>
    <p class="personas-sidebar-head-item-label">
      {{ label }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'PersonasSidebarHeadItem',
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "PersonasSidebarHeadItem";
</style>
