<template>
  <div class="account-team-box">
    <p class="account-team-box-headline">
      {{ title }}
    </p>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AccountTeamBox',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "AccountTeamBox";
</style>
