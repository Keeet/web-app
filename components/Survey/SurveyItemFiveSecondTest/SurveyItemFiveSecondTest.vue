<template>
  <div class="survey-item-five-second-test">
    <div v-if="!response.started" class="survey-item-five-second-test-button">
      <ButtonText text="Click to view image" @click="startTest" />
    </div>
    <SurveyItemMedia
      :image="item.image"
      :blur="!response.started"
    />
  </div>
</template>

<script>
import ButtonText from '../../_shared/ButtonText/ButtonText'
import SurveyItemMedia from '../SurveyItemMedia/SurveyItemMedia'
export default {
  name: 'SurveyItemFiveSecondTest',
  components: { SurveyItemMedia, ButtonText },
  computed: {
    item() {
      return this.$store.getters['surveyForm/activeItem']
    },
    response() {
      return this.$store.getters['surveyForm/activeResponse']
    }
  },
  methods: {
    startTest() {
      this.$store.commit('surveyForm/setFirstClickTimeout', this.item.duration)
      this.timer()
      this.$store.commit('surveyForm/startUsabilityTest')
    },
    timer() {
      window.setTimeout(() => {
        const t = this.response.timeout - 1
        if (t === 0) {
          this.$store.dispatch('surveyForm/nextStep')
        } else {
          this.$store.commit('surveyForm/setFirstClickTimeout', t)
          this.timer()
        }
      }, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SurveyItemFiveSecondTest";
</style>
