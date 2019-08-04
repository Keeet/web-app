<template>
  <CompanyList />
</template>

<script>
import CompanyList from '../../components/Internal/InternalCompanies/InternalCompanies'
export default {
  components: { CompanyList },
  fetch({ app: { $fetch } }) {
    return $fetch([{ name: 'USER' }, { name: 'SUPER_ADMIN_COMPANIES' }])
  }
}
</script>
