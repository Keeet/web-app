<template>
  <div class="survey-item-five-second-test">
    <div v-if="!response.started" class="survey-item-five-second-test-button">
      <div v-if="pending" class="survey-item-five-second-test-button-pending">
        <Loading />
      </div>
      <ButtonText
        v-else
        :text="$t('survey.items.fiveSecondTest.viewImageButton', s.language)"
        :bg-color="s.color"
        @click="startTest"
      />
    </div>
    <SurveyItemMedia
      :image="item.image.url"
      :frame="item.deviceFrame"
      :blur="!response.started"
      @imageLoad="pending = false"
    />
  </div>
</template>

<script>
import ButtonText from '../../_shared/ButtonText/ButtonText'
import SurveyItemMedia from '../SurveyItemMedia/SurveyItemMedia'
import Loading from '../../_shared/Loading/Loading'

export default {
  name: 'SurveyItemFiveSecondTest',
  components: { Loading, SurveyItemMedia, ButtonText },
  data() {
    return { pending: true }
  },
  computed: {
    s() {
      return this.$store.state.survey
    },
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
