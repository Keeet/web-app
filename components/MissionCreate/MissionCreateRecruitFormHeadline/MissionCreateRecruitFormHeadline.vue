<template>
  <p class="mission-create-recruit-form-headline" :class="{ underlined }">
    {{ text }}
  </p>
</template>

<script>
export default {
  name: 'MissionCreateRecruitFormHeadline',
  props: {
    text: {
      type: String,
      required: true
    },
    underlined: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitFormHeadline";
</style>
