<template>
  <div class="dashboard">
    <OverlayModal v-if="!$store.state.user.companyId" title="Last Step" no-close>
      <CompanyForm :loading="loading" @submit="companySubmitted" />
    </OverlayModal>
    <div class="dashboard-head">
      <Headline text="Projects" />
      <div class="dashboard-create">
        <div v-if="!projects.length" class="dashboard-create-start">
          <IconStartHereDashboard />
        </div>
        <ButtonCircle type="CREATE" @click="create" />
      </div>
    </div>
    <div v-if="!projects.length" class="dashboard-projects">
      <DashboardProject
        :title="sampleProject.title"
        :description="sampleProject.description"
        :created-at="$store.state.user.createdAt"
        :owner="sampleProject.owner"
      />
      <DashboardProjectEmpty />
      <DashboardProjectEmpty />
    </div>
    <div v-else class="dashboard-projects">
      <DashboardProject
        v-for="(project, index) in projects"
        :key="index"
        :title="project.title"
        :description="project.description"
        :created-at="project.createdAt"
        :owner="project.owner"
      />
    </div>
  </div>
</template>

<script>
import OverlayModal from '../_shared/OverlayModal/OverlayModal'
import CompanyForm from '../_shared/CompanyForm/CompanyForm'
import Headline from '../_shared/Headline/Headline'
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
import sampleProject from '../../assets/samples/sampleProject'
import DashboardProject from './DashboardProject/DashboardProject'
import DashboardProjectEmpty from './DashboardProjectEmpty/DashboardProjectEmpty'

export default {
  name: 'Dashboard',
  components: { ButtonCircle, DashboardProjectEmpty, DashboardProject, Headline, CompanyForm, OverlayModal },
  data() {
    return {
      loading: false,
      sampleProject
    }
  },
  computed: {
    projects() {
      return this.$store.state.projects
    }
  },
  beforeMount() {
    this.$store.commit('companyForm/init')
  },
  methods: {
    companySubmitted() {
      this.loading = true
      this.$auth.renewTokens().then(() => {
        this.$fetch([{ name: 'USER' }])
      }).catch(() => {
        this.$router.push(`/auth/login?redirectUrl=${encodeURI('/')}`)
      })
    },
    create() {
      this.$fetch([{ name: 'PROJECTS', forced: true }])
    }
  }
}
</script>

<style scoped lang="scss">
  @import "Dashboard";
</style>
