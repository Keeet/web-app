<template>
  <div class="mission-create-survey-summary">
    <MissionSideBox :type="s.type" wrapper-class="mission-create-survey">
      <template slot="body">
        <div class="mission-create-survey-summary-scrollable">
          <MissionCreateSurveySummaryItem type="WELCOME" title="Welcome Screen" no-drag />
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
          <MissionCreateSurveySummaryItem type="CLOSING" title="Thank-you Screen" no-drag />
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
              text="Cancel"
              type="GREY"
              no-margin
              @click="$store.commit('missionForm/previousStep')"
            />
          </div>
          <div class="mission-create-survey-summary-buttons-flex-item">
            <ButtonText
              text="Preview"
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
          text="Save and Continue"
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
import { MISSIONS } from '../../constants'
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
      const { missionForm, missionFormSurvey } = this.$store.state
      return {
        ...missionForm,
        survey: missionFormSurvey
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
        return 'about 1 min'
      }
      const min = parseInt(d / 60)
      return `${min} - ${min + 1} min`
    }
  },
  watch: {
    flatMappedItemsPricingData() {
      this.$store.dispatch('missionFormSurvey/fetchPricing')
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
