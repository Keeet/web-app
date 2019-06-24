<template>
  <div class="survey-item-select-choice" :style="{ backgroundColor }" :class="{ selected }" @click="$emit('click')">
    {{ choice }}
  </div>
</template>

<script>
export default {
  name: 'SurveyItemSelectChoice',
  props: {
    choice: {
      type: String,
      required: true
    },
    selected: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    s() {
      return this.$store.state.survey
    },
    backgroundColor() {
      return this.selected ? this.s.color : null
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SurveyItemSelectChoice";
</style>
