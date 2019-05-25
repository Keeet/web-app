<template>
  <div class="project-sidebar">
    <SidebarLeft
      cancel-path="/"
      :title="project.title"
      :description="project.description"
      :disable-edit-head="isSample"
      @editHead="editProject"
    >
      <SidebarLeftHeadline text="Owner" />
      <div class="project-sidebar-owner">
        <img class="project-sidebar-owner-img" :src="project.owner.profileImage">
        <p class="project-sidebar-owner-name">
          {{ project.owner.firstName }} {{ project.owner.lastName }}
        </p>
      </div>
    </SidebarLeft>
  </div>
</template>

<script>
import SidebarLeft from '../../_shared/SidebarLeft/SidebarLeft'
import SidebarLeftHeadline from '../../_shared/SidebarLeftHeadline/SidebarLeftHeadline'
export default {
  name: 'ProjectSidebar',
  components: { SidebarLeftHeadline, SidebarLeft },
  computed: {
    project() {
      return this.$store.state.project
    },
    isSample() {
      return !this.project.id
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
