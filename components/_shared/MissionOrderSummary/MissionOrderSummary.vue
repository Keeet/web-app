<template>
  <MissionSideBox :type="missionType" :wrapper-class="wrapperClass">
    <template slot="body">
      <div class="mission-order-summary">
        <table v-if="pricing" class="mission-order-summary-table">
          <tbody>
            <tr class="mission-order-summary-table-head">
              <td>Order summary</td>
              <td>&euro;</td>
            </tr>
            <tr class="mission-order-summary-table-base-price">
              <td>{{ count }}</td>
              <td v-if="pricing.basePrice">
                {{ pricing.basePrice.toFixed(2) }}
              </td>
            </tr>
            <MissionOrderSummaryCriteria v-if="getPrice(DURATION)" :criteria="DURATION" :price="getPrice(DURATION)" />
            <MissionOrderSummaryCriteria v-if="getPrice(AGE)" :criteria="AGE" :price="getPrice(AGE)" />
            <MissionOrderSummaryCriteria v-if="getPrice(GENDER)" :criteria="GENDER" :price="getPrice(GENDER)" />
            <MissionOrderSummaryCriteria v-if="getPrice(LANGUAGE)" :criteria="LANGUAGE" :price="getPrice(LANGUAGE)" />
            <MissionOrderSummaryCriteria v-if="getPrice(DEVICE_SKILL)" :criteria="DEVICE_SKILL" :price="getPrice(DEVICE_SKILL)" />
            <MissionOrderSummaryCriteria v-if="getPrice(SPECIAL_CRITERIA)" :criteria="SPECIAL_CRITERIA" :price="getPrice(SPECIAL_CRITERIA)" last />
            <tr class="mission-order-summary-table-sum">
              <td>Total</td>
              <td>{{ pricing.totalPrice.toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
        <p class="mission-order-summary-note">
          Includes incentives and excludes VAT.
        </p>
      </div>
    </template>
    <template slot="buttons">
      <ButtonText
        text="Back"
        type="GREY"
        @click="$emit('cancel')"
      />
      <ButtonText
        :text="submitLabel"
        :disabled="!isValid"
        @click="$emit('submit')"
        @disabledClick="invalidSubmit"
      />
    </template>
  </MissionSideBox>
</template>

<script>
import { MISSIONS, PERSONA_CRITERIA } from '../../constants'
import MissionSideBox from '../../_shared/MissionSideBox/MissionSideBox'
import ButtonText from '../../_shared/ButtonText/ButtonText'
import { scrollToTopId } from '../../../utils/scrollUtils'
import MissionOrderSummaryCriteria from '../MissionOrderSummaryCriteria/MissionOrderSummaryCriteria'

export default {
  name: 'MissionOrderSummary',
  components: { MissionOrderSummaryCriteria, ButtonText, MissionSideBox },
  props: {
    missionType: {
      type: String,
      required: true,
      validator: value => Object.keys(MISSIONS).includes(value)
    },
    priceChecksum: {
      type: String,
      required: true
    },
    wrapperClass: {
      type: String,
      required: true
    },
    submitLabel: {
      type: String,
      default: 'Order'
    }
  },
  data() {
    return { ...PERSONA_CRITERIA }
  },
  computed: {
    s() {
      const { missionForm, missionFormRecruit, missionFormSurvey, missionFormPersona } = this.$store.state
      return {
        ...missionForm,
        recruit: missionFormRecruit,
        survey: missionFormSurvey,
        persona: missionFormPersona
      }
    },
    isRecruit() {
      return [MISSIONS.IN_HOUSE, MISSIONS.REMOTE].includes(this.missionType)
    },
    isSurvey() {
      return [MISSIONS.SURVEY, MISSIONS.USABILITY_LAB].includes(this.missionType)
    },
    mission() {
      return this.$store.state.mission
    },
    isValid() {
      return !this.s.invalidFields.length
    },
    count() {
      if (this.isRecruit) {
        return `${this.s.participants} participants`
      } else if (this.isSurvey) {
        return `${this.s.participants} responses`
      }
      return null
    },
    pricing() {
      if (this.isRecruit) {
        return this.s.recruit.pricing
      } else if (this.isSurvey) {
        return this.s.survey.pricing
      }
      return null
    }
  },
  watch: {
    priceChecksum() {
      this.fetchPricing()
    }
  },
  mounted() {
    this.fetchPricing()
  },
  methods: {
    fetchPricing() {
      this.$store.dispatch(this.getFetchMutation(), {
        globalGetters: this.$store.getters,
        missionForm: this.s,
        missionFormPersona: this.s.persona
      })
    },
    getFetchMutation() {
      if (this.isRecruit) {
        return 'missionFormRecruit/fetchPricing'
      } else if (this.isSurvey) {
        return 'missionFormSurvey/fetchPricing'
      }
    },
    invalidSubmit() {
      this.$emit('invalidSubmit')
      this.scrollToErrors()
    },
    scrollToErrors() {
      scrollToTopId(this.s.invalidFields.map(field => field.id))
    },
    getPrice(criteria) {
      if (!this.pricing || !this.pricing.items) {
        return null
      }
      const item = this.pricing.items.find(item => item.type === criteria)
      return item ? item.price : null
    }
  }
}
</script>

<style lang="scss">
  @import "MissionOrderSummary";
</style>
