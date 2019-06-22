<template>
  <div class="mission-create-survey-item-five-second-test">
    <p class="mission-create-survey-item-five-second-test-explanation">
      We will warn participants that the following design will only be visible for a limited time.
    </p>
    <div class="mission-create-survey-item-five-second-test-input">
      <p>Design shown for</p>
      <div class="mission-create-survey-item-five-second-test-input-item">
        <Input
          :value="item.duration.toString()"
          :error="durationError"
          dispatch-error="missionForm/handleValidationError"
          no-margin
          @change="setDuration"
        />
      </div>
      <p>seconds.</p>
    </div>
    <MissionCreateSurveyUsabilityLabUpload :index="index" />
  </div>
</template>

<script>
import MissionCreateSurveyUsabilityLabUpload
  from '../MissionCreateSurveyUsabilityLabUpload/MissionCreateSurveyUsabilityLabUpload'
import Input from '../../_shared/Input/Input'
import { isNum } from '../../../utils/stringUtils'
export default {
  name: 'MissionCreateSurveyItemFiveSecondTest',
  components: { Input, MissionCreateSurveyUsabilityLabUpload },
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    s() {
      return this.$store.state.missionFormSurvey
    },
    item() {
      return this.s.items[this.index]
    },
    durationError() {
      return isNum(this.item.duration) ? null : 'numbers only'
    }
  },
  methods: {
    setDuration(duration) {
      this.$store.commit('missionFormSurvey/setItemFiveSecondTestDuration', {
        duration,
        itemIndex: this.index
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionCreateSurveyItemFiveSecondTest";
</style>
