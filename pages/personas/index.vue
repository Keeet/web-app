<template>
  <Personas />
</template>

<script>
import Personas from '../../components/Personas/Personas'
export default {
  name: 'PersonasPage',
  components: { Personas },
  fetch({ app: { $fetch } }) {
    return $fetch([{ name: 'USER' }, { name: 'PERSONAS', mockDataKey: 'mockDataEmpty' }])
  }
}
</script>
