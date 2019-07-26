<template>
  <div class="mission-survey-share-box">
    <div class="mission-survey-share-box-head">
      <div class="mission-survey-share-box-head-left">
        <p class="mission-survey-share-box-head-left-title">
          {{ title }}
        </p>
        <p>
          {{ text }}
        </p>
      </div>
      <div>
        <slot v-if="$slots.right" name="right" />
        <slot v-else-if="$slots.default" />
      </div>
    </div>
    <div v-if="$slots.body" class="mission-survey-share-box-body">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MissionSurveyShareBox',
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyShareBox";
</style>
