<template>
  <div class="account-profile">
    <AccountProfileItem>
      <template slot="icon">
        <div class="account-profile-user-icon">
          <img :src="user.profileImage">
        </div>
      </template>
      <template slot="text">w
        <p class="account-profile-text-headline">
          {{ user.firstName }} {{ user.lastName }}
        </p>
        <p>{{ user.email }}</p>
        <p>Member since {{ formattedCreatedAt }}</p>
        <p>{{ formattedRole }}</p>
      </template>
    </AccountProfileItem>
    <AccountProfileItem :button-text="$hasRole('ADMIN') ? 'Edit Company' : null" :aos-delay="300" @clickButton="editCompany">
      <template slot="icon">
        <IconLocation />
      </template>
      <template slot="text">
        <p class="account-profile-text-headline">
          {{ company.name }}
        </p>
        <p>{{ company.street }}, {{ company.houseNumber }}</p>
        <p>{{ company.zipCode }}, {{ company.city }}</p>
        <p>{{ company.country }}</p>
      </template>
    </AccountProfileItem>
    <OverlayModal
      v-if="accountPage.showEditCompany"
      title="Edit company"
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
export default {
  name: 'AccountProfile',
  components: { CompanyForm, OverlayModal, AccountProfileItem },
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
