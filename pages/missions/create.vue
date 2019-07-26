<template>
  <MissionCreate />
</template>

<script>
import MissionCreate from '../../components/MissionCreate/MissionCreate'
export default {
  name: 'Create',
  layout: 'defaultNoFooter',
  components: { MissionCreate },
  fetch({ app: { $fetch }, store }) {
    const { projectId } = store.state.missionForm
    return $fetch([{ name: 'USER' }, { name: 'COMPANY' }, { name: 'PROJECT', id: projectId }])
  }
}
</script>
