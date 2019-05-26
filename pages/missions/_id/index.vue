<template>
  <Mission />
</template>

<script>
import sampleProject from '../../../assets/samples/sampleProject'
import Mission from '../../../components/Mission/Mission'

export default {
  name: 'Id',
  layout: 'defaultWithoutWrapper',
  components: { Mission },
  fetch({ app: { $fetch }, params, store, route }) {
    if (route.path.endsWith('insights')) {
      store.commit('missionPage/showInsights')
    } else {
      store.commit('missionPage/showOverview')
    }

    if (route.path.endsWith('overview') || route.path.endsWith('insights')) {
      store.commit('missionPage/disableSidebarAnimation', true)
    } else {
      store.commit('missionPage/disableSidebarAnimation', false)
    }

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
