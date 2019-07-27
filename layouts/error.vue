<template>
  <Error :error="error" />
</template>

<script>
import Error from '../components/_shared/Error/Error'
export default {
  name: 'ErrorVue',
  components: { Error },
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  fetch({ app: { $fetch } }) {
    return $fetch([{ name: 'USER' }])
  },
  layout: 'blank'
}
</script>
