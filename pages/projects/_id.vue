<template>
  <Project />
</template>

<script>
import Project from '../../components/Project/Project'
import sampleProject from '../../assets/samples/sampleProject'

export default {
  name: 'Id',
  layout: 'defaultWithoutWrapper',
  components: { Project },
  fetch({ app: { $fetch }, params, store }) {
    const { id } = params
    const fetchCfg = [{ name: 'USER' }, { name: 'COMPANY' }]

    if (id === 'sample') {
      store.commit('setProject', sampleProject)
    } else {
      fetchCfg.push({ name: 'PROJECT', id })
    }
    return $fetch(fetchCfg)
  }
}
</script>
