<template>
  <MissionCreateSurveyItemQuestion
    :index="index"
    :type="item.type"
    :value="item.text"
    :required="item.required"
  />
</template>

<script>
import MissionCreateSurveyItemQuestion from '../MissionCreateSurveyItemQuestion/MissionCreateSurveyItemQuestion'
export default {
  name: 'MissionCreateSurveyItemTextQuestion',
  components: { MissionCreateSurveyItemQuestion },
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
  }
}
</script>
