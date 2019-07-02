<template>
  <div class="survey-item-first-click">
    <div v-if="!response.started" class="survey-item-first-click-button">
      <ButtonText text="Click to view image" @click="$store.commit('surveyForm/startUsabilityTest')" />
    </div>
    <SurveyItemMedia
      :image="item.image"
      :overlay-coordinates="overlayCoordinates"
      :blur="!response.started"
      :frame="item.deviceFrame"
      @click="selectCoordinates"
    >
      <template slot="overlay">
        <div class="survey-item-first-click-selected">
          <div class="survey-item-first-click-selected-dot" />
          <div v-if="!response.confirmed" class="survey-item-first-click-selected-box">
            <ButtonText text="Confirm click" no-margin @click="confirmCoordinates" />
            <p class="survey-item-first-click-selected-box-cancel" @click="unselectCoordinates">
              Cancel
            </p>
          </div>
        </div>
      </template>
    </SurveyItemMedia>
  </div>
</template>

<script>
import SurveyItemMedia from '../SurveyItemMedia/SurveyItemMedia'
import ButtonText from '../../_shared/ButtonText/ButtonText'
export default {
  name: 'SurveyItemFirstClick',
  components: { ButtonText, SurveyItemMedia },
  computed: {
    item() {
      return this.$store.getters['surveyForm/activeItem']
    },
    response() {
      return this.$store.getters['surveyForm/activeResponse']
    },
    overlayCoordinates() {
      const { x, y } = this.response
      if (x === null || y === null) {
        return null
      }
      return { x, y }
    },
    error() {
      if (!this.item.required) {
        return null
      }
      const { x, y } = this.response
      return x !== null && y !== null && this.response.confirmed ? null : 'required'
    }
  },
  watch: {
    error: {
      immediate: true,
      handler(error) {
        this.$store.dispatch('surveyForm/handleValidationError', { error })
      }
    }
  },
  methods: {
    selectCoordinates({ x, y }) {
      if (!this.response.confirmed) {
        this.$store.commit('surveyForm/setFirstClickCoordinates', { x, y })
      }
    },
    unselectCoordinates() {
      this.$store.commit('surveyForm/setFirstClickCoordinates', { x: null, y: null })
    },
    confirmCoordinates() {
      this.$store.commit('surveyForm/confirmFirstClickCoordinates')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "SurveyItemFirstClick";
</style>
