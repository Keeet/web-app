<template>
  <Twilio />
</template>

<script>
import Twilio from '../../../components/Twilio/Twilio'
export default {
  name: 'VideoSession',
  components: { Twilio },
  layout: 'blank',
  validate({ params: { sessionId } }) {
    return !!sessionId
  },
  fetch({ app: { $fetch }, params: { sessionId } }) {
    return $fetch([{ name: 'VIDEO_SESSION_COMPANY', id: sessionId }])
  }
}
</script>
