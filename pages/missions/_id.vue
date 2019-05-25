<template>
  <Mission />
</template>

<script>
import sampleProject from '../../assets/samples/sampleProject'
import Mission from '../../components/Mission/Mission'

export default {
  name: 'Id',
  layout: 'defaultWithoutWrapper',
  components: { Mission },
  fetch({ app: { $fetch }, params, store }) {
    const { id } = params
    const fetchCfg = [{ name: 'USER' }]

    if (id.startsWith('sample-')) {
      const mission = sampleProject.missions.filter(m => m.id === id)
      if (mission.length) {
        store.commit('setMission', { ...mission[0], projectId: 'sample' })
      }
    } else {
      fetchCfg.push({ name: 'MISSION', id })
    }
    return $fetch(fetchCfg)
  }
}
</script>
