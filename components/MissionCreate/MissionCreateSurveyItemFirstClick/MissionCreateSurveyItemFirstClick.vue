<template>
  <div class="mission-create-survey-item-first-click">
    <div class="mission-create-survey-item-first-click-instruction">
      <Input
        :title="$t('missionCreate.survey.items.firstClick.titleLabel', $store.state.locale)"
        :placeholder="$t('missionCreate.survey.items.firstClick.titlePlaceholder', $store.state.locale)"
        :error="error"
        dispatch-error="missionForm/handleValidationError"
        :disable-error="!showError && !s.showErrors"
        :value="item.instruction"
        @change="setInstruction"
        @focusout="showError = true"
      />
    </div>
    <MissionCreateSurveyUsabilityLabUpload :index="index" />
  </div>
</template>

<script>
import MissionCreateSurveyUsabilityLabUpload
  from '../MissionCreateSurveyUsabilityLabUpload/MissionCreateSurveyUsabilityLabUpload'
import Input from '../../_shared/Input/Input'
export default {
  name: 'MissionCreateSurveyItemFirstClick',
  components: { Input, MissionCreateSurveyUsabilityLabUpload },
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return { showError: false }
  },
  computed: {
    s() {
      return {
        ...this.$store.state.missionForm,
        survey: this.$store.state.missionFormSurvey
      }
    },
    item() {
      return this.s.survey.items[this.index]
    },
    error() {
      return this.item.instruction !== '' ? null : 'required'
    }
  },
  methods: {
    setInstruction(instruction) {
      this.$store.commit('missionFormSurvey/setItemInstruction', {
        instruction,
        itemIndex: this.index
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionCreateSurveyItemFirstClick";
</style>
