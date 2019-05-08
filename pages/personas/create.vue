<template>
  <Persona />
</template>

<script>
import Persona from '../../components/Persona/Persona'
export default {
  name: 'PersonaPage',
  components: { Persona },
  fetch({ app: { $fetch } }) {
    return $fetch([{ name: 'USER' }])
  }
}
</script>
