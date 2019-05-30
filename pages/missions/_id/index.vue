<template>
  <Mission />
</template>

<script>
import sampleProject from '../../../assets/samples/sampleProject'
import sampleMissionInsights from '../../../assets/samples/sampleMissionInsights'
import Mission from '../../../components/Mission/Mission'

export default {
  name: 'Id',
  layout: 'defaultLean',
  components: { Mission },
  fetch({ app: { $fetch }, params, store, route }) {
    const IS_INSIGHT = route.path.endsWith('insights')
    const IS_OVERVIEW = route.path.endsWith('overview')
    const IS_INDEX = !IS_INSIGHT && !IS_OVERVIEW

    if (IS_INSIGHT || IS_OVERVIEW) {
      store.commit('missionPage/disableAnimation', true)
    } else {
      store.commit('missionPage/disableAnimation', false)
    }

    const { id } = params
    const fetchCfg = [{ name: 'USER' }]

    if (id.startsWith('sample-')) {
      store.commit('setMission', { ...sampleProject.missions[0], projectId: 'sample' })
      if (IS_INSIGHT) {
        store.commit('setMissionInsights', sampleMissionInsights)
      }
    } else {
      fetchCfg.push({ name: 'MISSION', id })
      if (IS_INSIGHT) {
        fetchCfg.push({ name: 'MISSION_INSIGHTS', id })
      }
    }
    return $fetch(fetchCfg).then(() => {
      if (IS_INSIGHT) {
        store.commit('missionPage/showInsights')
      } else if (IS_OVERVIEW || IS_INDEX) {
        store.commit('missionPage/showOverview')
      }
    })
  }
}
</script>
