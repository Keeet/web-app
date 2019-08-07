<template>
  <div class="account-team">
    <AccountTeamBox
      :title="$t('account.team.members.title', $store.state.locale, { count: companyUsers.length })"
    >
      <AccountTeamMembers />
    </AccountTeamBox>
    <AccountTeamBox
      v-if="$hasRole('ADMIN')"
      :title="$t('account.team.invite.title', $store.state.locale)"
      :aos-delay="300"
    >
      <AccountTeamInvite />
    </AccountTeamBox>
  </div>
</template>

<script>
import AccountTeamBox from '../AccountTeamBox/AccountTeamBox'
import AccountTeamMembers from '../AccountTeamMembers/AccountTeamMembers'
import AccountTeamInvite from '../AccountTeamInvite/AccountTeamInvite'
export default {
  name: 'AccountTeam',
  components: { AccountTeamInvite, AccountTeamMembers, AccountTeamBox },
  computed: {
    companyUsers() {
      return this.$store.state.companyUsers
    }
  }
}
</script>

<style scoped lang="scss">
  @import "AccountTeam";
</style>
