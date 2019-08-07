<template>
  <Internal />
</template>

<script>
import Internal from '../../components/Internal/Internal'
export default {
  components: { Internal },
  fetch({ app: { $fetch } }) {
    return $fetch([{ name: 'USER' }, { name: 'SUPER_ADMIN_COMPANIES' }])
  }
}
</script>
