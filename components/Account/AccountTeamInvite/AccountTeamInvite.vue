<template>
  <div class="account-team-invite">
    <div class="account-team-invite-form" :class="{ hidden: s.pending }">
      <Input
        :value="s.email"
        mutation="userInviteForm/setEmail"
        placeholder="max.mustermann@gmail.com"
        title="Email address"
        :disable-error="!showErrors"
        :error="emailError"
      />
      <div class="account-team-invite-form-rows">
        <div class="account-team-invite-form-role">
          <SelectCustom
            v-closable="{
              excludeClasses: [
                'account-team-invite-form-role'
              ],
              handler: 'closeRoleDropdown'
            }"
            :opened="s.roleDropdownOpened"
            :value="s.role"
            :options="selectRoleOptions"
            @clickHead="switchRoleDropdown"
            @select="select"
          >
            <template slot="selected">
              <p class="account-team-invite-form-role-selected">
                <span class="account-team-invite-form-role-selected-label">Role</span> {{ ROLE_LABELS[s.role] }}
              </p>
            </template>
            <template v-for="(role, x) in selectRoleOptions" :slot="role">
              <AccountTeamRole
                :key="x"
                :role="role"
                :active="role === s.role"
              />
            </template>
          </SelectCustom>
        </div>
        <ButtonText
          text="Invite"
          :disabled="!valid"
          @click="inviteUser"
          @disabledClick="showErrors = true"
        />
      </div>
    </div>
    <div class="account-team-invite-loading">
      <IconLoading v-if="s.pending" />
    </div>
  </div>
</template>

<script>
import Input from '../../_shared/Input/Input'
import { isEmail } from '../../../utils/stringUtils'
import { ROLES, ROLE_LABELS } from '../../constants'
import SelectCustom from '../../_shared/SelectCustom/SelectCustom'
import AccountTeamRole from '../AccountTeamRole/AccountTeamRole'
import ButtonText from '../../_shared/ButtonText/ButtonText'

export default {
  name: 'AccountTeamInvite',
  components: { ButtonText, AccountTeamRole, SelectCustom, Input },
  data() {
    return { ROLE_LABELS, showErrors: false }
  },
  computed: {
    s() {
      return this.$store.state.userInviteForm
    },
    selectRoleOptions() {
      return Object.keys(ROLES)
    },
    emailError() { return isEmail(this.s.email) ? null : 'invalid email' },
    valid() {
      return !this.emailError
    }
  },
  beforeCreate() {
    this.$store.commit('userInviteForm/init', ROLES.USER)
  },
  methods: {
    select(role) {
      this.$store.commit('userInviteForm/setRole', role)
      this.$store.commit('userInviteForm/switchRoleDropdown')
    },
    inviteUser() {
      const { email, role } = this.s
      this.$store.commit('userInviteForm/pending')
      this.$push.inviteCompanyUser({ email, role }).then(() => {
        this.$store.commit('userInviteForm/init', ROLES.USER)
        this.$store.commit('userInviteForm/submitted')
      })
    },
    switchRoleDropdown() {
      this.$store.commit('userInviteForm/switchRoleDropdown')
    },
    closeRoleDropdown() {
      if (this.s.roleDropdownOpened) {
        this.switchRoleDropdown()
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "AccountTeamInvite";
</style>
