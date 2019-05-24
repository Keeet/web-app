<template>
  <div class="mission-create-headline">
    <h2 class="mission-create-headline-main">
      {{ text }}
    </h2>
    <p v-if="subtitle" class="mission-create-headline-sub">
      {{ subtitle }}
    </p>
    <hr v-if="subtitle" class="mission-create-headline-line"/>
  </div>
</template>

<script>
export default {
  name: 'MissionCreateHeadline',
  props: {
    text: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateHeadline";
</style>
