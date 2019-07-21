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
    const IS_BILLING = route.path.endsWith('billing')
    const IS_INDEX = !IS_PROFILE && !IS_TEAM && !IS_BILLING

    const fetchCfg = [{ name: 'USER' }]

    if (IS_TEAM) {
      fetchCfg.push({ name: 'COMPANY_USERS' })
    } else if (IS_INDEX || IS_PROFILE || IS_BILLING) {
      fetchCfg.push({ name: 'COMPANY' })
    }

    if (IS_TEAM || IS_PROFILE) {
      store.commit('accountPage/disableAnimation')
    } else {
      store.commit('accountPage/disableAnimation', false)
    }

    return $fetch(fetchCfg).then(() => {
      if (IS_TEAM) {
        store.commit('accountPage/showTeam')
      } else if (IS_BILLING) {
        store.commit('accountPage/showBilling')
        store.commit('accountBillingForm/init', store.state.company.billingConfig)
      } else if (IS_INDEX || IS_PROFILE) {
        store.commit('accountPage/showProfile')
      }
    })
  }
}
</script>
