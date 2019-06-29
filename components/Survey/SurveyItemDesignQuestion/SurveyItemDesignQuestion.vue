<template>
  <div class="survey-design-question">
    <SurveyItemMedia
      :image="item.image"
      :frame="item.deviceFrame"
      @click="$emit('click')"
    />
  </div>
</template>

<script>
import SurveyItemMedia from '../SurveyItemMedia/SurveyItemMedia'
export default {
  name: 'SurveyItemDesignQuestion',
  components: { SurveyItemMedia },
  computed: {
    item() {
      return this.$store.getters['surveyForm/activeRootItem']
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SurveyItemDesignQuestion";
</style>
