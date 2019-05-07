<template>
  <div class="personas-sidebar-table">
    <p class="personas-sidebar-table-headline">
      {{ title }}
    </p>
    <table class="personas-sidebar-table-content">
      <tbody>
        <tr
          v-for="(row, x) in rows"
          :key="x"
          :class="{ dark: (x+1)%2 }"
        >
          <td class="personas-sidebar-table-content-label">
            {{ row.label }}
          </td>
          <td class="personas-sidebar-table-content-value">
            {{ row.value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PersonasSidebarTable',
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
  @import "PersonasSidebarTable";
</style>
