<template>
  <div
    class="account-team-box-wrapper"
    data-aos="fade-up"
    data-aos-duration="500"
    :data-aos-delay="aosDelay"
    data-aos-once="true"
    data-aos-anchor="body"
  >
    <div class="account-team-box">
      <p class="account-team-box-headline">
        {{ title }}
      </p>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountTeamBox',
  props: {
    title: {
      type: String,
      required: true
    },
    aosDelay: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped lang="scss">
  @import "AccountTeamBox";
</style>
