<template>
  <MissionSideBox :type="mission.type" wrapper-class="mission-survey-order-body">
    <template slot="body">
      <div class="mission-survey-order-summary">
        <table class="mission-survey-order-summary-table">
          <tbody>
            <tr class="mission-survey-order-summary-table-head">
              <td>Order summary</td>
              <td>&euro;</td>
            </tr>
            <tr>
              <td>{{ s.survey.requiredCount }} responses</td>
            </tr>
            <tr v-if="s.survey.pricing" class="mission-survey-order-summary-table-sum">
              <td>Total</td>
              <td>{{ s.survey.pricing.price.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
        <p class="mission-survey-order-summary-note">
          Includes incentives and excludes VAT.
        </p>
      </div>
    </template>
    <template slot="buttons">
      <nuxt-link :to="`/missions/${mission.id}/share`">
        <ButtonText
          text="Cancel"
          type="GREY"
        />
      </nuxt-link>
      <ButtonText
        text="Order"
        :disabled="!isValid"
        @disabledClick="scrollToErrors"
      />
    </template>
  </MissionSideBox>
</template>

<script>
import MissionSideBox from '../../_shared/MissionSideBox/MissionSideBox'
import ButtonText from '../../_shared/ButtonText/ButtonText'
import { scrollToTopId } from '../../../utils/scrollUtils'
export default {
  name: 'MissionSurveyOrderSummary',
  components: { ButtonText, MissionSideBox },
  computed: {
    s() {
      const { missionForm, missionFormSurvey } = this.$store.state
      return {
        ...missionForm,
        survey: missionFormSurvey
      }
    },
    mission() {
      return this.$store.state.mission
    },
    requiredCount() {
      return this.s.survey.requiredCount
    },
    isValid() {
      return !this.s.invalidFields.length
    }
  },
  watch: {
    requiredCount() {
      if (this.isValid) {
        this.$store.dispatch('missionFormSurvey/fetchPricing')
      }
    }
  },
  mounted() {
    this.$store.dispatch('missionFormSurvey/fetchPricing')
  },
  methods: {
    scrollToErrors() {
      scrollToTopId(this.s.invalidFields.map(field => field.id))
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionSurveyOrderSummary";
</style>
