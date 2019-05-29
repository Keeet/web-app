<template>
  <div class="persona-sidebar-head-item">
    <p class="persona-sidebar-head-item-value">
      {{ value }}
    </p>
    <p class="persona-sidebar-head-item-label">
      {{ label }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'PersonaSidebarHeadItem',
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
  @import "PersonaSidebarHeadItem";
</style>
