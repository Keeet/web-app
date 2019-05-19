<template>
  <div class="project-sidebar">
    <div class="project-sidebar-cancel">
      <nuxt-link to="/">
        <ButtonCircle type="ARROW_LEFT" />
      </nuxt-link>
    </div>
    <div class="project-sidebar-head">
      <p class="project-sidebar-headline text-overflow-ellipsis">
        {{ project.title }}
      </p>
      <div class="project-sidebar-head-edit">
        <IconPencil @click="editProject" />
      </div>
      <p class="project-sidebar-head-description">
        {{ project.description }}
      </p>
    </div>
    <div class="project-sidebar-body">
      <p class="project-sidebar-headline text-overflow-ellipsis">
        Owner
      </p>
      <div class="project-sidebar-owner">
        <img class="project-sidebar-owner-img" :src="project.owner.profileImage">
        <p class="project-sidebar-owner-name">
          {{ project.owner.firstName }} {{ project.owner.lastName }}
        </p>
      </div>
    </div>
    <OverlayModal
      v-if="projectForm.overlayOpened"
      title="Edit Project"
      :loading="projectForm.pending"
      @close="$store.commit('projectForm/setOverlayOpened', false)"
    >
      <ProjectForm />
    </OverlayModal>
  </div>
</template>

<script>
import ButtonCircle from '../../_shared/ButtonCircle/ButtonCircle'
import OverlayModal from '../../_shared/OverlayModal/OverlayModal'
import ProjectForm from '../ProjectForm/ProjectForm'
export default {
  name: 'ProjectSidebar',
  components: { ProjectForm, OverlayModal, ButtonCircle },
  computed: {
    project() {
      return this.$store.state.project
    },
    projectForm() {
      return this.$store.state.projectForm
    }
  },
  methods: {
    editProject() {
      this.$store.commit('projectForm/init', this.project)
      this.$store.commit('projectForm/setOverlayOpened', true)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "ProjectSidebar";
</style>
