<template>
  <Dashboard />
</template>

<script>

import Dashboard from '../components/Dashboard/Dashboard'
export default {
  components: { Dashboard },
  fetch({ app: { $fetch } }) {
    return $fetch([{ name: 'USER' }, { name: 'PROJECTS' }])
  }
}
</script>
