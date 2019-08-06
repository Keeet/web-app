<template>
  <div v-if="!pending" class="internal-companies">
    <InternalCompaniesItem
      v-for="(company, index) in companies"
      :key="index"
      :name="company.name"
      :company-id="company.id"
      @click.native="selectCompany(company.id)"
    />
  </div>
  <Loading v-else />
</template>

<script>
import InternalCompaniesItem from '../InternalCompaniesItem/InternalCompaniesItem'
import Loading from '../../_shared/Loading/Loading'
export default {
  name: 'InternalCompanies',
  components: { Loading, InternalCompaniesItem },
  data() {
    return {
      pending: false
    }
  },
  computed: {
    companies() {
      return this.$store.state.superAdminCompanies
    }
  },
  methods: {
    selectCompany(id) {
      this.pending = true
      this.$push.updateSuperAdminCompany(id).then(() => {
        this.$auth.renewTokens().then(() => {
          window.location = '/'
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'InternalCompanies';
</style>
