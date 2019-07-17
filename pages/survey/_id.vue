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
  validate({ params: { id }, query: { orderId, cintUserId } }) {
    return !!id && ((!!orderId && !!cintUserId) || (!orderId && !cintUserId))
  },
  fetch({ app: { $fetch }, params: { id }, query: { orderId, cintUserId }, redirect, store }) {
    if (id !== 'preview') {
      const queryParams = orderId ? { orderId } : null
      return new Promise((resolve) => {
        $fetch([{ name: 'SURVEY', id, queryParams, forced: true }])
          .then(() => {
            store.commit('surveyForm/init', {
              items: store.state.survey.items,
              orderId: orderId || null,
              cintUserId: cintUserId || null
            })
            resolve()
          })
          .catch((err) => {
            const { status, data } = err.response
            if (status === 410) {
              const { cintProjectToken } = data
              redirect(`https://s.cint.com/Survey/QuotaFull?ProjectToken=${cintProjectToken}`)
            }
          })
      })
    }
    return true
  }
}
</script>
