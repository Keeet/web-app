<template>
  <div class="company">
    <div>
      <div class="name">
        {{ name }}
      </div>
      <div class="companyId">
        {{ company_id }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanyItem',
  components: {},
  props: {
    name: {
      type: String,
      required: true
    },
    company_id: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "CompanyItem";
</style>
