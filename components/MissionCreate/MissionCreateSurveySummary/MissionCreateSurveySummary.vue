<template>
  <div class="mission-create-survey-summary">
    <MissionSideBox :type="s.type" wrapper-class="mission-create-survey">
      <template slot="body">
        <div class="mission-create-survey-summary-scrollable">
          <MissionCreateSurveySummaryItem
            type="WELCOME"
            :title="$t('missionCreate.survey.summary.welcomeScreen', $store.state.locale)"
            no-drag
          />
          <div class="mission-create-survey-summary-sortable">
            <draggable
              v-model="items"
              handle=".mission-create-survey-summary-item-drag"
              ghost-class="ghost"
              drag-class="drag"
              chosen-class="chosen"
              :animation="150"
            >
              <MissionCreateSurveySummaryItem
                v-for="(item, x) in items"
                :key="x"
                :index="x"
                :type="item.type"
              />
            </draggable>
          </div>
          <MissionCreateSurveySummaryItem
            type="CLOSING"
            :title="$t('missionCreate.survey.summary.closingScreen', $store.state.locale)"
            no-drag
          />
        </div>
        <div class="mission-create-survey-summary-duration">
          <div class="mission-create-survey-summary-duration-icon">
            <IconClock />
          </div>
          <div class="mission-create-survey-summary-duration-text">
            {{ durationText }}
          </div>
        </div>
      </template>
      <template slot="buttons">
        <div class="mission-create-survey-summary-buttons-flex">
          <div class="mission-create-survey-summary-buttons-flex-item">
            <ButtonText
              :text="$t('missionCreate.survey.summary.cancelButton', $store.state.locale)"
              type="GREY"
              no-margin
              @click="$emit('cancelClick')"
            />
          </div>
          <div class="mission-create-survey-summary-buttons-flex-item">
            <ButtonText
              :text="$t('missionCreate.survey.summary.previewButton', $store.state.locale)"
              type="GREY"
              icon="LINK_EXTERNAL"
              no-margin
              :disabled="!isValid"
              @disabledClick="$emit('submitDisabledClick')"
              @click="openPreview"
            />
          </div>
        </div>
        <ButtonText
          :text="submitButtonText"
          no-margin
          :disabled="!isValid"
          @disabledClick="$emit('submitDisabledClick')"
          @click="$emit('submitClick')"
        />
      </template>
    </MissionSideBox>
  </div>
</template>

<script>
import { COUNTRIES, MISSIONS } from '../../constants'
import MissionCreateSurveySummaryItem from '../MissionCreateSurveySummaryItem/MissionCreateSurveySummaryItem'
import ButtonText from '../../_shared/ButtonText/ButtonText'
import { flatMap } from '../../../utils/objectUtils'
import MissionSideBox from '../../_shared/MissionSideBox/MissionSideBox'

export default {
  name: 'MissionCreateSurveySummary',
  components: { MissionSideBox, ButtonText, MissionCreateSurveySummaryItem },
  props: {
    isValid: {
      type: Boolean,
      required: true
    }
  },
  data() {
    const { SURVEY } = MISSIONS
    return {
      SURVEY
    }
  },
  computed: {
    items: {
      get() {
        return this.$store.state.missionFormSurvey.items
      },
      set(value) {
        this.$store.commit('missionFormSurvey/setItems', value)
      }
    },
    s() {
      const { missionForm, missionFormSurvey, missionFormPersona } = this.$store.state
      return {
        ...missionForm,
        survey: missionFormSurvey,
        persona: missionFormPersona
      }
    },
    flatMappedItems() {
      const itemsDeepArray = this.items
        .map(i => [i, ...(i.followUps ? i.followUps : [])])
      return flatMap(itemsDeepArray)
    },
    flatMappedItemsPricingData() {
      return JSON.stringify({
        length: this.flatMappedItems.length,
        types: this.flatMappedItems.map(i => i.type).sort()
      })
    },
    durationText() {
      const { pricing } = this.s.survey
      const d = pricing ? pricing.duration : 0
      if (d <= 60) {
        return this.$t('missionCreate.survey.summary.durationDefault', this.$store.state.locale)
      }
      const min = parseInt(d / 60)
      return this.$t('missionCreate.survey.summary.durationVariables', this.$store.state.locale, { val1: min, val2: min + 1 })
    },
    submitButtonText() {
      return this.s.editExisting
        ? this.$t('missionCreate.survey.summary.submitEditButton', this.$store.state.locale)
        : this.$t('missionCreate.survey.summary.submitCreateButton', this.$store.state.locale)
    }
  },
  watch: {
    flatMappedItemsPricingData() {
      if (this.s.survey.items.length === 0) {
        this.$store.commit('missionFormSurvey/setPricing', null)
        return
      }
      this.$store.dispatch('missionFormSurvey/fetchPricing', {
        globalGetters: this.$store.getters,
        missionForm: this.s,
        missionFormPersona: {
          ...this.s.persona,
          // no country selected -> we can use any country by default,
          // since we just need the estimated duration and no country respective pricing
          countries: [COUNTRIES.DE]
        }
      })
    }
  },
  methods: {
    openPreview() {
      window.open('/survey/preview', '_blank')
    }
  }
}
</script>

<style lang="scss">
  @import "MissionCreateSurveySummary";
</style>
