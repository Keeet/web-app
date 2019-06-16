<template>
  <MissionCreateBox>
    <div class="mission-create-survey-item">
      <div class="mission-create-survey-item-head">
        <div class="mission-create-survey-item-head-icon" :class="type">
          <MissionCreateSurveyIcon :type="type" />
          <span>{{ index + 1 }}</span>
        </div>
        <p class="mission-create-survey-item-head-title">
          {{ MISSION_SURVEY_ITEM_LABELS[type] }}
        </p>
        <div class="mission-create-survey-item-head-delete" @click="deleteItem">
          <IconDelete />
        </div>
      </div>
      <hr class="mission-create-survey-item-separator">
      <div class="mission-create-survey-item-body">
        <slot />
      </div>
    </div>
  </MissionCreateBox>
</template>

<script>
import MissionCreateBox from '../MissionCreateBox/MissionCreateBox'
import MissionCreateSurveyIcon from '../MissionCreateSurveyIcon/MissionCreateSurveyIcon'
import { MISSION_SURVEY_ITEM_LABELS, MISSION_SURVEY_ITEMS, MISSION_SURVEY_USABILITY_HUB_ITEMS } from '../../constants'

export default {
  name: 'MissionCreateSurveyItem',
  components: { MissionCreateSurveyIcon, MissionCreateBox },
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.values({ ...MISSION_SURVEY_ITEMS, ...MISSION_SURVEY_USABILITY_HUB_ITEMS }).includes(value)
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return { MISSION_SURVEY_ITEM_LABELS }
  },
  methods: {
    deleteItem() {
      this.$store.commit('missionFormSurvey/deleteItem', this.index)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyItem";
</style>
