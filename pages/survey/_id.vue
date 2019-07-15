<template>
  <Survey />
</template>

<script>
import Survey from '../../components/Survey/Survey'
export default {
  name: 'Id',
  head: {
    script: [
      { hid: 'crisp', innerHTML: '' }
    ]
  },
  components: { Survey },
  layout: 'blank',
  validate({ params: { id } }) {
    return !!id
  },
  fetch({ app: { $fetch }, params: { id } }) {
    if (id !== 'preview') {
      return $fetch([{ name: 'SURVEY', id }])
    }
    return true
  }
}
</script>
