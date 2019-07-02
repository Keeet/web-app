<template>
  <div class="mission-create-survey-summary">
    <MissionCreateSideBox :type="s.type">
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
            <ButtonText text="Preview" type="GREY" icon="LINK_EXTERNAL" no-margin />
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
    </MissionCreateSideBox>
  </div>
</template>

<script>
import { MISSIONS } from '../../constants'
import MissionCreateSurveySummaryItem from '../MissionCreateSurveySummaryItem/MissionCreateSurveySummaryItem'
import MissionCreateSideBox from '../MissionCreateSideBox/MissionCreateSideBox'
import ButtonText from '../../_shared/ButtonText/ButtonText'
import { groupBy } from '../../../utils/objectUtils'

export default {
  name: 'MissionCreateSurveySummary',
  components: { ButtonText, MissionCreateSideBox, MissionCreateSurveySummaryItem },
  props: {
    isValid: {
      type: Boolean,
      required: true
    }
  },
  data() {
    const { SURVEY } = MISSIONS
    return {
      pricing: null,
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
      return this.$store.state.missionForm
    },
    flatMappedItems() {
      return this.items
        .map(i => [i, ...(i.followUps ? i.followUps : [])])
        .flatMap(i => i)
    },
    flatMappedItemsPricingData() {
      return JSON.stringify({
        length: this.flatMappedItems.length,
        types: this.flatMappedItems.map(i => i.type).sort()
      })
    },
    durationText() {
      const d = this.pricing ? this.pricing.duration : 0
      if (d <= 60) {
        return 'about 1 min'
      }
      const min = parseInt(d / 60)
      return `${min} - ${min + 1} min`
    }
  },
  watch: {
    flatMappedItemsPricingData() {
      this.fetchPricing().then((pricing) => {
        this.pricing = pricing
      })
    }
  },
  methods: {
    fetchPricing() {
      const groupedByType = groupBy(this.flatMappedItems, 'type')
      const countByType = {}
      Object.keys(groupedByType).forEach((type) => {
        countByType[type] = groupedByType[type].length
      })
      return new Promise((resolve) => {
        this.$axios({
          method: 'post',
          url: '/pricing/quantitative',
          data: {
            items: {
              ...countByType
            },
            expectedResponses: 1
          }
        })
          .then(res => resolve(res.data))
          // eslint-disable-next-line no-console
          .catch(console.error)
      })
    }
  }
}
</script>

<style lang="scss">
  @import "MissionCreateSurveySummary";
</style>
