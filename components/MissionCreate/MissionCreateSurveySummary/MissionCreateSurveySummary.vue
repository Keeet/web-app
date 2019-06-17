<template>
  <div class="mission-create-survey-summary">
    <MissionCreateSideBox :type="SURVEY">
      <template slot="body">
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
        <div class="mission-create-survey-summary-duration">
          <div class="mission-create-survey-summary-duration-icon">
            <IconClock />
          </div>
          <div class="mission-create-survey-summary-duration-text">
            1 to 2 minutes
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
    return { SURVEY }
  },
  computed: {
    items: {
      get() {
        return this.$store.state.missionFormSurvey.items
      },
      set(value) {
        this.$store.commit('missionFormSurvey/setItems', value)
      }
    }
  }
}
</script>

<style lang="scss">
  @import "MissionCreateSurveySummary";
</style>
