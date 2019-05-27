<template>
  <Account />
</template>

<script>
import Account from '../../components/Account/Account'
export default {
  name: 'Index',
  components: { Account },
  fetch({ app: { $fetch }, store, route }) {
    if (route.path.endsWith('team')) {
      store.commit('accountPage/showTeam')
    } else {
      store.commit('accountPage/showProfile')
    }

    return $fetch([{ name: 'USER' }])
  }
}
</script>
