<template>
  <div class="project-missions-empty">
    <div
      data-aos="zoom-in"
      data-aos-duration="800"
      data-aos-once="true"
      data-aos-anchor=".content"
    >
      <img src="../../../assets/img/project-missions-empty.png">
      <p class="project-missions-empty-title">
        {{ $t('project.empty.title', $store.state.locale) }}
      </p>
      <p class="project-missions-empty-text">
        {{ $t('project.empty.text', $store.state.locale) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectMissionsEmpty'
}
</script>

<style scoped lang="scss">
  @import "ProjectMissionsEmpty";
</style>
