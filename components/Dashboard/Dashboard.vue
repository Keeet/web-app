<template>
  <div class="dashboard">
    <OverlayModal
      v-if="!$store.state.tokenCompanyId"
      title="Last Step"
      no-close
      :loading="companyForm.pending"
    >
      <CompanyForm />
    </OverlayModal>
    <div class="dashboard-head">
      <Headline text="Projects" />
      <div v-if="$hasAnyRole(['ADMIN', 'USER'])" class="dashboard-create">
        <div v-if="!projects || !projects.length" class="dashboard-create-start">
          <IconStartHereDashboard />
        </div>
        <ButtonCircle type="CREATE" @click="create" />
      </div>
    </div>
    <div class="dashboard-projects">
      <DashboardProject
        v-if="!company.sampleProjectDeleted"
        :title="sampleProject.title"
        :description="sampleProject.description"
        :created-at="$store.state.user.createdAt"
        :owner="sampleProject.owner"
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-once="true"
        @click.native="$router.push('/projects/sample')"
      />
      <DashboardProject
        v-for="(project, index) in projects"
        :key="index"
        :title="project.title"
        :description="project.description"
        :created-at="project.createdAt"
        :owner="project.owner"
        :aos-delay="50 * index"
        @click.native="$router.push(`/projects/${project.id}`)"
      />
      <DashboardProjectEmpty
        v-if="!projects || !projects.length"
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-delay="50"
        data-aos-once="true"
      />
      <DashboardProjectEmpty
        v-if="!projects || !projects.length"
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-delay="100"
        data-aos-once="true"
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
    company() {
      return this.$store.state.company
    },
    companyForm() {
      return this.$store.state.companyForm
    }
  },
  mounted() {
    this.$ga.page(this.$router)
  },
  beforeMount() {
    this.$store.commit('companyForm/init')
  },
  methods: {
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
