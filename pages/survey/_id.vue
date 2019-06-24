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
    return $fetch([{ name: 'SURVEY', id }])
  }
}
</script>
