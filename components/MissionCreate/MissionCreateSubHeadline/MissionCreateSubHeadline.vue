<template>
  <div class="mission-create-sub-headline">
    <p class="mission-create-sub-headline-text">
      {{ text }}
    </p>
    <hr class="mission-create-sub-headline-line"/>
  </div>
</template>

<script>
export default {
  name: 'MissionCreateSubHeadline',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSubHeadline";
</style>
