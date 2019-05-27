<template>
  <div
    data-aos="fade-up"
    data-aos-duration="800"
    :data-aos-delay="aosDelay"
    data-aos-once="true"
    data-aos-anchor="body"
  >
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
    },
    aosDelay: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped lang="scss">
  @import "AccountProfileItem";
</style>
