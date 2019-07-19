<template>
  <Survey />
</template>

<script>
import Survey from '../../components/Survey/Survey'

function redirectIfSufficientCintResponses(res, redirect) {
  const cintGone = res.find(item => item.statusCode === 410)
  if (cintGone) {
    const { message: { cintProjectToken } } = cintGone
    redirect(`https://s.cint.com/Survey/QuotaFull?ProjectToken=${cintProjectToken}`)
    return true
  }
}

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
    if (id === 'preview') {
      return true
    }
    return new Promise((resolve) => {
      $fetch([{
        name: 'SURVEY',
        id,
        queryParams: orderId ? { orderId } : null,
        forced: true
      }])
        .then((res) => {
          if (cintUserId && redirectIfSufficientCintResponses(res, redirect)) {
            return
          }
          store.commit('surveyForm/init', {
            items: store.state.survey.items,
            orderId: orderId || null,
            cintUserId: cintUserId || null
          })
          resolve()
        })
    })
  }
}
</script>
