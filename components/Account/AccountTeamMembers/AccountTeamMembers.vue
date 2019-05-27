<template>
  <div class="account-team-members">
    <AccountTeamMembersItem
      :user="user"
    />
    <AccountTeamMembersItem
      v-for="(companyUser, x) in companyUsers"
      :key="x"
      :index="x"
      :user="companyUser"
    />
  </div>
</template>

<script>
import AccountTeamMembersItem from '../AccountTeamMembersItem/AccountTeamMembersItem'
export default {
  name: 'AccountTeamMembers',
  components: { AccountTeamMembersItem },
  computed: {
    user() {
      return this.$store.state.user
    },
    companyUsers() {
      return this.$store.state.companyUsers
    }
  }
}
</script>
