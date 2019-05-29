<template>
  <div class="persona-sidebar-table">
    <p class="persona-sidebar-table-headline">
      {{ title }}
    </p>
    <table class="persona-sidebar-table-content">
      <tbody>
        <tr
          v-for="(row, x) in rows"
          :key="x"
          :class="{ dark: (x+1)%2 }"
        >
          <td class="persona-sidebar-table-content-label">
            {{ row.label }}
          </td>
          <td class="persona-sidebar-table-content-value">
            {{ row.value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PersonaSidebarTable',
  props: {
    title: {
      type: String,
      required: true
    },
    rows: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "PersonaSidebarTable";
</style>
