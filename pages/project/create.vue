<template>
  <ProjectCreate />
</template>

<script>
import ProjectCreate from '../../components/ProjectCreate/ProjectCreate'
export default {
  name: 'Create',
  components: { ProjectCreate },
  fetch({ app: { $fetch } }) {
    return $fetch([{ name: 'USER' }])
  }
}
</script>
