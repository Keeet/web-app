<template>
  <div class="account-profile-item">
    <div class="account-profile-item-icon">
      <slot name="icon" />
    </div>
    <div class="account-profile-item-text">
      <slot name="text" />
    </div>
    <div class="account-profile-item-button">
      <ButtonText v-if="buttonText" :text="buttonText" @click="$emit('clickButton')" />
    </div>
  </div>
</template>

<script>
import ButtonText from '../../_shared/ButtonText/ButtonText'
export default {
  name: 'AccountProfileItem',
  components: { ButtonText },
  props: {
    buttonText: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
  @import "AccountProfileItem";
</style>
