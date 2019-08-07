<template>
  <div class="mission-create-survey-item-five-second-test">
    <p class="mission-create-survey-item-five-second-test-explanation">
      {{ $t('missionCreate.survey.items.fiveSecondTest.explanation', $store.state.locale) }}
    </p>
    <div class="mission-create-survey-item-five-second-test-input">
      <p>
        {{ $t('missionCreate.survey.items.fiveSecondTest.durationLabel1', $store.state.locale) }}
      </p>
      <div class="mission-create-survey-item-five-second-test-input-item">
        <Input
          :value="item.duration.toString()"
          :error="durationError"
          dispatch-error="missionForm/handleValidationError"
          no-margin
          @change="setDuration"
        />
      </div>
      <p>
        {{ $t('missionCreate.survey.items.fiveSecondTest.durationLabel2', $store.state.locale) }}
      </p>
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
      const duration = this.item.duration
      return isNum(duration) && duration >= 5 && duration <= 60 ? null : 'between 5-60'
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
