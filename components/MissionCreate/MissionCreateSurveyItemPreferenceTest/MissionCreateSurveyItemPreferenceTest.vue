<template>
  <div class="mission-create-survey-item-preference-test">
    <div class="mission-create-survey-item-preference-test-instruction">
      <Input
        title="Instruction"
        placeholder="Which design do you prefer?"
        :value="item.instruction"
        @change="setInstruction"
      />
    </div>
    <MissionCreateSurveyUsabilityLabUpload :index="index" multi-upload />
  </div>
</template>

<script>
import MissionCreateSurveyUsabilityLabUpload
  from '../MissionCreateSurveyUsabilityLabUpload/MissionCreateSurveyUsabilityLabUpload'
import Input from '../../_shared/Input/Input'
export default {
  name: 'MissionCreateSurveyItemPreferenceTest',
  components: { Input, MissionCreateSurveyUsabilityLabUpload },
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    item() {
      return this.$store.state.missionFormSurvey.items[this.index]
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
  @import "MissionCreateSurveyItemPreferenceTest";
</style>
