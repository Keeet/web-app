<template>
  <AuthCallback />
</template>

<script>
import AuthCallback from '../../components/AuthCallback/AuthCallback'
export default {
  name: 'Callback',
  components: { AuthCallback },
  layout: 'blank',
  head() {
    return {
      title: 'Keeet - Verify your email'
    }
  }
}
</script>
