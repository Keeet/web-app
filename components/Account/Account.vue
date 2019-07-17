<template>
  <div class="account">
    <div class="account-headline">
      <Headline text="Account" :disable-animation="accountPage.disableAnimation" />
    </div>
    <div class="account-nav">
      <NavUnderlined
        :items="[
          {
            page: ACCOUNT_PAGES.PROFILE,
            label: 'Profile',
            link: '/account/profile'
          },
          {
            page: ACCOUNT_PAGES.TEAM,
            label: 'Team',
            link: '/account/team'
          }
        ]"
        :active-page="accountPage.activePage"
        :disable-animation="accountPage.disableAnimation"
      />
    </div>
    <AccountProfile v-if="accountPage.activePage === ACCOUNT_PAGES.PROFILE" />
    <AccountTeam v-if="accountPage.activePage === ACCOUNT_PAGES.TEAM" />
  </div>
</template>

<script>
import { ACCOUNT_PAGES } from '../constants'
import Headline from '../_shared/Headline/Headline'
import NavUnderlined from '../_shared/NavUnderlined/NavUnderlined'
import AccountProfile from './AccountProfile/AccountProfile'
import AccountTeam from './AccountTeam/AccountTeam'
export default {
  name: 'Account',
  components: { AccountTeam, AccountProfile, NavUnderlined, Headline },
  data() {
    return { ACCOUNT_PAGES }
  },
  computed: {
    accountPage() {
      return this.$store.state.accountPage
    }
  },
  mounted() {
    this.$ga.page(this.$router)
  }
}
</script>

<style scoped lang="scss">
  @import "Account";
</style>
