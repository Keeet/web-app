<template>
  <div class="account-team">
    <AccountTeamBox :title="`Members (${companyUsers.length})`">
      <AccountTeamMembers />
    </AccountTeamBox>
    <AccountTeamBox title="Invite members" :aos-delay="400">
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
