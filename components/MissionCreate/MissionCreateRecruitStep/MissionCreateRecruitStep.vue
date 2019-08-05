<template>
  <div class="mission-create-recruit-step">
    <FormStep
      :show-next="isCalendar"
      :show-prev="isCalendar"
      next-step-mutation="missionForm/nextStep"
      prev-step-mutation="missionForm/previousStep"
      :active="s.activeStep === index"
      :valid="s.invalidFields.length === 0"
      @invalidNext="invalidNextClick"
    >
      <div class="mission-create-recruit-step-head">
        <MissionCreateHeadline
          :text="$t('missionCreate.recruit.stepHeadline', $store.state.locale, { index, missionType: MISSION_LABELS[s.type] })"
        />
        <MissionCreateSubHeadline v-if="subheadline" :text="subheadline" />
      </div>
      <div class="mission-create-recruit-step-body">
        <div class="mission-create-recruit-step-body-content" :class="{ sideboxActive: !isCalendar }">
          <slot />
        </div>
        <MissionOrderSummary
          v-show="!isCalendar"
          :mission-type="s.type"
          :price-checksum="priceChecksum"
          :submit-label="last ? 'Order' : 'Continue'"
          wrapper-class="mission-create-recruit-step-body"
          @cancel="$store.commit('missionForm/previousStep')"
          @invalidSubmit="invalidNextClick"
          @submit="last ? $emit('submit') : $store.commit('missionForm/nextStep')"
        />
      </div>
    </FormStep>
  </div>
</template>

<script>
import FormStep from '../../_shared/FormStep/FormStep'
import { scrollToTopId } from '../../../utils/scrollUtils'
import MissionCreateHeadline from '../MissionCreateHeadline/MissionCreateHeadline'
import { MISSION_LABELS } from '../../constants'
import MissionCreateSubHeadline from '../MissionCreateSubHeadline/MissionCreateSubHeadline'
import MissionOrderSummary from '../../_shared/MissionOrderSummary/MissionOrderSummary'

export default {
  name: 'MissionCreateRecruitStep',
  components: { MissionOrderSummary, MissionCreateSubHeadline, MissionCreateHeadline, FormStep },
  props: {
    index: {
      type: Number,
      required: true
    },
    subheadline: {
      type: String,
      default: null
    },
    last: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { MISSION_LABELS }
  },
  computed: {
    s() {
      const { missionForm, missionFormPersona, missionFormRecruit } = this.$store.state
      return {
        ...missionForm,
        persona: missionFormPersona,
        recruit: missionFormRecruit
      }
    },
    isCalendar() {
      return this.index === 3
    },
    priceChecksum() {
      return this.$store.getters['missionFormRecruit/pricingChecksum']({
        missionForm: this.s,
        missionFormPersona: this.s.persona
      })
    }
  },
  methods: {
    invalidNextClick() {
      if (!this.s.showErrors) {
        this.$store.commit('missionForm/showErrors')
      }
      scrollToTopId(this.s.invalidFields.map(field => field.id))
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitStep";
</style>
