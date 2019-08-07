<template>
  <Project />
</template>

<script>
import Project from '../../components/Project/Project'
import sampleProject from '../../assets/samples/sampleProject'

export default {
  name: 'Id',
  layout: 'defaultLean',
  components: { Project },
  fetch({ app: { $fetch }, params, store, redirect }) {
    const { id } = params
    const fetchCfg = [{ name: 'USER' }, { name: 'COMPANY' }, { name: 'PROJECTS' }]

    if (id === 'sample') {
      store.commit('setProject', sampleProject)
    } else {
      fetchCfg.push({ name: 'PROJECT', id })
    }

    return $fetch(fetchCfg, () => {
      const { missions } = store.state.project
      const HAS_MISSIONS = missions && missions.length > 0

      if (!HAS_MISSIONS) {
        store.dispatch('missionForm/initProjectMission', { project: store.state.project })
        return redirect('/missions/create')
      }
    })
  }
}
</script>
