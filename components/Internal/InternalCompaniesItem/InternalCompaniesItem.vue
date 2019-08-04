<template>
  <div class="internal-companies-item">
    <div>
      <div class="internal-companies-item-name">
        {{ name }}
      </div>
      <div class="internal-companies-item-company-id">
        {{ companyId }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InternalCompaniesItem',
  props: {
    name: {
      type: String,
      required: true
    },
    companyId: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "InternalCompaniesItem";
</style>
