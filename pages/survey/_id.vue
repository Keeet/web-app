<template>
  <Survey />
</template>

<script>
import Survey from '../../components/Survey/Survey'

function redirectIfSufficientCintResponses(err, redirect) {
  const cintGone = err.statusCode === 410
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
    return $fetch([{
      name: 'SURVEY',
      id,
      queryParams: orderId ? { orderId } : null,
      forced: true
    }], () => {
      store.commit('surveyForm/init', {
        items: store.state.survey.items,
        orderId: orderId || null,
        cintUserId: cintUserId || null
      })
    }, (err) => {
      if (cintUserId && redirectIfSufficientCintResponses(err, redirect)) {
        return
      }
      return err
    })
  }
}
</script>
