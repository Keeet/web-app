<template>
  <div class="survey-item-first-click">
    <div v-if="!response.started" class="survey-item-first-click-button">
      <ButtonText
        text="Click to view image"
        :bg-color="s.color"
        @click="$store.commit('surveyForm/startUsabilityTest')"
      />
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
          <div
            class="survey-item-first-click-selected-dot"
            :style="{ backgroundColor: s.color }"
          />
          <div v-if="!response.confirmed" class="survey-item-first-click-selected-box">
            <ButtonText
              text="Confirm click"
              no-margin
              :bg-color="s.color"
              @click="confirmCoordinates"
            />
            <p
              class="survey-item-first-click-selected-box-cancel"
              :style="{ color: s.color }"
              @click="unselectCoordinates"
            >
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
    s() {
      return this.$store.state.survey
    },
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
      this.$store.dispatch('surveyForm/nextStep')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "SurveyItemFirstClick";
</style>
