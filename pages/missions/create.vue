<template>
  <MissionCreate />
</template>

<script>
import MissionCreate from '../../components/MissionCreate/MissionCreate'
export default {
  name: 'Create',
  components: { MissionCreate },
  fetch({ app: { $fetch } }) {
    return $fetch([{ name: 'USER' }, { name: 'PERSONAS' }])
  }
}
</script>
