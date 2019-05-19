<template>
  <Project />
</template>

<script>
import Project from '../../components/Project/Project'
export default {
  name: 'Id',
  components: { Project },
  fetch({ app: { $fetch }, params }) {
    const { id } = params
    return $fetch([{ name: 'USER' }, { name: 'PROJECT', id }])
  }
}
</script>

<style scoped>

</style>
