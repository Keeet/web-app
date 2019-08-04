a<template>
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
      const companyUsers = this.$store.state.companyUsers.slice()
      return companyUsers.filter(user => user.id !== this.user.id)
    }
  }
}
</script>
