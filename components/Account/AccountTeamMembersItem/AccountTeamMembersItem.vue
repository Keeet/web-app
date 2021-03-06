<template>
  <div class="account-team-members-item">
    <div class="account-team-members-item-left">
      <div class="account-team-members-item-icon">
        <ThumborImage
          :src="user.profileImage"
          :width="90"
          :height="90"
        />
      </div>
      <div class="account-team-members-item-text">
        <p class="account-team-members-item-text-name">
          {{ user.firstName }} {{ user.lastName }}
          <span v-if="user.id === myUser.id">
            {{ $t('account.team.members.youLabel', $store.state.locale) }}
          </span>
        </p>
        <p class="account-team-members-item-text-email">
          {{ user.email }}
        </p>
      </div>
    </div>
    <div class="account-team-members-item-role">
      <SelectCustom
        v-if="$hasRole('ADMIN') && myUser.id !== user.id"
        v-closable="{
          excludeClasses: [
            'account-team-members-item-role'
          ],
          handler: 'closeRoleDropdown'
        }"
        :opened="index === accountPage.roleDropdownOpenedIndex"
        :value="user.role"
        :options="selectRoleOptions"
        no-head-border
        small-angle
        @clickHead="clickHead"
        @select="select"
      >
        <template slot="selected">
          <p class="account-team-members-item-role-selected">
            {{ ROLE_LABELS[user.role] }}
          </p>
        </template>
        <template v-for="(role, x) in selectRoleOptions" :slot="role">
          <AccountTeamRole
            :key="x"
            :role="role"
            :active="role === user.role"
            :loading="pendingRole === role"
          />
        </template>
      </SelectCustom>
      <p v-else class="account-team-members-item-role-selected no-select">
        {{ ROLE_LABELS[user.role] }}
      </p>
    </div>
  </div>
</template>

<script>
import SelectCustom from '../../_shared/SelectCustom/SelectCustom'
import { ROLES, ROLE_LABELS } from '../../constants'
import AccountTeamRole from '../AccountTeamRole/AccountTeamRole'
import ThumborImage from '../../_shared/ThumborImage/ThumborImage'

export default {
  name: 'AccountTeamMembersItem',
  components: { ThumborImage, AccountTeamRole, SelectCustom },
  props: {
    user: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      ROLE_LABELS,
      pendingRole: null
    }
  },
  computed: {
    myUser() {
      return this.$store.state.user
    },
    accountPage() {
      return this.$store.state.accountPage
    },
    selectRoleOptions() {
      return Object.keys(ROLES)
    }
  },
  methods: {
    clickHead() {
      if (this.index !== this.accountPage.roleDropdownOpenedIndex) {
        this.openRoleDropdown()
      } else {
        this.closeRoleDropdown()
      }
    },
    openRoleDropdown() {
      this.$store.commit('accountPage/openRoleDropdown', this.index)
    },
    closeRoleDropdown() {
      this.$store.commit('accountPage/closeRoleDropdown')
    },
    select(role) {
      if (role !== this.user.role) {
        const { id } = this.user
        this.pendingRole = role
        this.$push.updateCompanyUserRole({ id, role }).then(() => {
          this.pendingRole = null
          this.$store.commit('accountPage/closeRoleDropdown')
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "AccountTeamMembersItem";
</style>
