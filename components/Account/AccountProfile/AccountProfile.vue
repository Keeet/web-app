<template>
  <div class="account-profile">
    <AccountProfileItem>
      <template slot="icon">
        <div class="account-profile-user-icon">
          <ThumborImage
            :src="user.profileImage"
            :width="200"
            :height="200"
          />
        </div>
      </template>
      <template slot="text">
        <p class="account-profile-text-headline">
          {{ user.firstName }} {{ user.lastName }}
        </p>
        <p>{{ user.email }}</p>
        <p>{{ $t('account.profile.memberSince', $store.state.locale, { date: formattedCreatedAt }) }}</p>
        <p>{{ formattedRole }}</p>
      </template>
    </AccountProfileItem>
    <AccountProfileItem
      :button-text="$hasRole('ADMIN') ? $t('account.profile.editButton', $store.state.locale) : null"
      :aos-delay="300"
      @clickButton="editCompany"
    >
      <template slot="icon">
        <IconLocation />
      </template>
      <template slot="text">
        <p class="account-profile-text-headline">
          {{ company.name }}
        </p>
      </template>
    </AccountProfileItem>
    <OverlayModal
      v-if="accountPage.showEditCompany"
      :title="$t('account.profile.form.title', $store.state.locale)"
      :loading="companyForm.pending"
      @close="closeEditCompanyForm"
    >
      <CompanyForm edit @submit="closeEditCompanyForm" />
    </OverlayModal>
  </div>
</template>

<script>
import { ROLE_LABELS } from '../../constants'
import { getLocaleDateString } from '../../../utils/dateUtils'
import AccountProfileItem from '../AccountProfileItem/AccountProfileItem'
import OverlayModal from '../../_shared/OverlayModal/OverlayModal'
import CompanyForm from '../../_shared/CompanyForm/CompanyForm'
import ThumborImage from '../../_shared/ThumborImage/ThumborImage'
export default {
  name: 'AccountProfile',
  components: { ThumborImage, CompanyForm, OverlayModal, AccountProfileItem },
  computed: {
    user() {
      return this.$store.state.user
    },
    company() {
      return this.$store.state.company
    },
    companyForm() {
      return this.$store.state.companyForm
    },
    accountPage() {
      return this.$store.state.accountPage
    },
    formattedCreatedAt() {
      return getLocaleDateString(new Date(this.user.createdAt))
    },
    formattedRole() {
      return ROLE_LABELS[this.user.role]
    }
  },
  methods: {
    editCompany() {
      this.$store.commit('companyForm/init', this.company)
      this.$store.commit('accountPage/showEditCompany')
    },
    closeEditCompanyForm() {
      this.$store.commit('accountPage/hideEditCompany')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "AccountProfile";
</style>
