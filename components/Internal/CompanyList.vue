<template>
  <div v-if="showInternal" class="companies">
    <CompanyItem
      v-for="(company, index) in companies"
      :key="index"
      :name="company.name"
      :company_id="company.id"
      @click.native="selectCompany(company.id)"
    />
  </div>
</template>

<script>
import CompanyItem from './CompanyItem'
export default {
  name: 'CompanyList',
  components: { CompanyItem },
  computed: {
    companies() {
      return this.$store.state.companies
    },
    showInternal() {
      return this.$auth.hasScope('super:admin')
    }
  },
  methods: {
    selectCompany(id) {
      this.$push.updateSuperAdminCompany(id).then(() => {
        this.$auth.logOut()
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "CompanyList";
</style>
