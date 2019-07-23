<template>
  <div class="project-sidebar">
    <SidebarLeft
      cancel-path="/"
      :title="project.title"
      :description="description"
      :disable-edit-head="isSample || !$hasAnyRole(['ADMIN', 'USER'])"
      @editHead="editProject"
    >
      <SidebarLeftHeadline text="Owner" />
      <div class="project-sidebar-owner">
        <img class="project-sidebar-owner-img" :src="project.owner.profileImage">
        <p class="project-sidebar-owner-name">
          {{ project.owner.firstName }} {{ project.owner.lastName }}
        </p>
      </div>
      <div v-if="!isSample" class="project-sidebar-delete">
        <ButtonText
          type="GREY_DELETE"
          text="delete project"
          @click="$store.commit('projectPage/openDeleteConfirm')"
        />
      </div>
    </SidebarLeft>
    <Confirm
      v-if="projectPage.deleteConfirmOpened"
      title="Are you sure?"
      text="Delete project and all its missions."
      label-confirm="Yes"
      label-cancel="Cancel"
      @close="closeDeleteConfirm"
      @cancel="closeDeleteConfirm"
      @confirm="deleteProject"
    />
  </div>
</template>

<script>
import SidebarLeft from '../../_shared/SidebarLeft/SidebarLeft'
import SidebarLeftHeadline from '../../_shared/SidebarLeftHeadline/SidebarLeftHeadline'
import Confirm from '../../_shared/Confirm/Confirm'
import ButtonText from '../../_shared/ButtonText/ButtonText'

export default {
  name: 'ProjectSidebar',
  components: { ButtonText, Confirm, SidebarLeftHeadline, SidebarLeft },
  computed: {
    project() {
      return this.$store.state.project
    },
    projectPage() {
      return this.$store.state.projectPage
    },
    isSample() {
      return !this.project.id
    },
    description() {
      return this.project.description || 'Enter your project description here. Explain what you want to test or what insights you want to collect.'
    }
  },
  methods: {
    editProject() {
      this.$store.commit('projectForm/init', this.project)
      this.$store.commit('projectForm/setOverlayOpened', true)
    },
    closeDeleteConfirm() {
      this.$store.commit('projectPage/closeDeleteConfirm')
    },
    deleteProject() {
      this.$push.deleteProject(this.project.id).then(() => {
        this.$store.commit('setProject', null)
        this.closeDeleteConfirm()
        this.$router.push('/')
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "ProjectSidebar";
</style>
