<template>
  <Account />
</template>

<script>
import Account from '../../components/Account/Account'
export default {
  name: 'Index',
  components: { Account },
  fetch({ app: { $fetch }, store, route }) {
    const IS_PROFILE = route.path.endsWith('profile')
    const IS_TEAM = route.path.endsWith('team')
    const IS_INDEX = !IS_PROFILE && !IS_TEAM

    const fetchCfg = [{ name: 'USER' }]

    if (IS_TEAM) {
      store.commit('accountPage/showTeam')
      fetchCfg.push({ name: 'COMPANY_USERS' })
    } else if (IS_INDEX || IS_PROFILE) {
      store.commit('accountPage/showProfile')
      fetchCfg.push({ name: 'COMPANY' })
    }

    if (IS_TEAM || IS_PROFILE) {
      store.commit('accountPage/disableAnimation')
    } else {
      store.commit('accountPage/disableAnimation', false)
    }

    return $fetch(fetchCfg)
  }
}
</script>
