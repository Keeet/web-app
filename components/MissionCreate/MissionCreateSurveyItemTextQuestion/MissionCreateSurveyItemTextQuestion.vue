<template>
  <MissionCreateSurveyItem
    :type="item.type"
    :index="index"
  >
    <MissionCreateSurveyItemQuestion
      :index="index"
      :type="item.type"
      :value="item.text"
      :required="item.required"
    />
  </MissionCreateSurveyItem>
</template>

<script>
import MissionCreateSurveyItem from '../MissionCreateSurveyItem/MissionCreateSurveyItem'
import MissionCreateSurveyItemQuestion from '../MissionCreateSurveyItemQuestion/MissionCreateSurveyItemQuestion'
export default {
  name: 'MissionCreateSurveyItemTextQuestion',
  components: { MissionCreateSurveyItemQuestion, MissionCreateSurveyItem },
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
}
</script>
