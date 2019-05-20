<template>
  <div class="project-sidebar">
    <div
      data-aos="fade-right"
      data-aos-duration="1000"
      data-aos-once="true"
      data-aos-delay="500"
    >
      <div class="project-sidebar-cancel">
        <nuxt-link to="/">
          <ButtonCircle type="ARROW_LEFT" />
        </nuxt-link>
      </div>
      <div class="project-sidebar-head">
        <p class="project-sidebar-headline text-overflow-ellipsis" @click="editProject">
          {{ project.title }}
        </p>
        <div class="project-sidebar-head-edit">
          <IconPencil @click="editProject" />
        </div>
        <p class="project-sidebar-head-description" @click="editProject">
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
    </div>
  </div>
</template>

<script>
import ButtonCircle from '../../_shared/ButtonCircle/ButtonCircle'
export default {
  name: 'ProjectSidebar',
  components: { ButtonCircle },
  computed: {
    project() {
      return this.$store.state.project
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
