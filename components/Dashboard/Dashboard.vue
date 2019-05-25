<template>
  <div class="dashboard">
    <OverlayModal
      v-if="!$store.state.user.companyId"
      title="Last Step"
      no-close
      :loading="companyForm.pending"
    >
      <CompanyForm @submit="companySubmitted" />
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
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-once="true"
        @click.native="$router.push('/projects/sample')"
      />
      <DashboardProjectEmpty
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="300"
        data-aos-once="true"
      />
      <DashboardProjectEmpty
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="600"
        data-aos-once="true"
      />
    </div>
    <div v-else class="dashboard-projects">
      <DashboardProject
        v-for="(project, index) in projects"
        :key="index"
        :title="project.title"
        :description="project.description"
        :created-at="project.createdAt"
        :owner="project.owner"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-once="true"
        :data-aos-delay="300 * index"
        data-aos-anchor=".dashboard-projects"
        @click.native="$router.push(`/projects/${project.id}`)"
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
      sampleProject
    }
  },
  computed: {
    projects() {
      return this.$store.state.projects
    },
    companyForm() {
      return this.$store.state.companyForm
    }
  },
  beforeMount() {
    this.$store.commit('companyForm/init')
  },
  methods: {
    companySubmitted() {
      this.$store.commit('companyForm/pending')
      // renew token to get token with company id
      this.$auth.renewTokens().then(() => {
        this.$fetch([{ name: 'USER', forced: true }, { name: 'COMPANY' }]).then(() => {
          this.$store.commit('companyForm/submitted')
        })
      }).catch(() => {
        this.$router.push(`/auth/login?redirectUrl=${encodeURI('/')}`)
      })
    },
    create() {
      this.$store.commit('projectForm/init')
      this.$router.push('/projects/create')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "Dashboard";
</style>
