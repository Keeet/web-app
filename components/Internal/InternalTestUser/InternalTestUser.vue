<template>
  <div class="internal-test-user">
    <p class="internal-test-user-headline">
      Set test user
    </p>
    <div class="internal-test-user-form">
      <div v-if="$store.state.internal.testUserIdPending" class="internal-test-user-form-pending">
        <Loading />
      </div>
      <div v-else class="internal-test-user-form-inner">
        <Input
          class="internal-test-user-form-input"
          placeholder="Auth0UserId"
          :value="testUserId"
          mutation="internal/setTestUserId"
        />
        <ButtonText
          text="Set test user"
          :disabled="testUserId === ''"
          @click="$store.dispatch('internal/submitTestUserId')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Input from '../../_shared/Input/Input'
import ButtonText from '../../_shared/ButtonText/ButtonText'
import Loading from '../../_shared/Loading/Loading'
export default {
  name: 'InternalTestUser',
  components: { Loading, ButtonText, Input },
  computed: {
    testUserId() {
      return this.$store.state.internal.testUserId
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "InternalTestUser";
</style>
