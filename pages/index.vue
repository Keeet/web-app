<template>
  <Dashboard />
</template>

<script>

import Dashboard from '../components/Dashboard/Dashboard'
export default {
  components: { Dashboard },
  fetch({ app: { $fetch }, store }) {
    const fetchCfg = [{ name: 'USER' }]
    if (store.state.tokenCompanyId) {
      fetchCfg.push({ name: 'PROJECTS', mockDataKey: 'mockDataEmpty' })
    }
    return $fetch(fetchCfg)
  }
}
</script>
