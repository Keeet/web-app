<template>
  <div class="project">
    <ProjectSidebar />
  </div>
</template>

<script>
import ProjectSidebar from './ProjectSidebar/ProjectSidebar'
export default {
  name: 'Project',
  components: { ProjectSidebar },
  computed: {
    project() {
      return this.$store.project
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "Project";
</style>
