<template>
  <div class="mission-create-survey-items">
    <draggable
      v-model="items"
      handle=".mission-create-survey-item-head-drag"
      ghost-class="ghost"
      drag-class="drag"
      :animation="150"
    >
      <MissionCreateSurveyItem
        v-for="(item, x) in items"
        :key="x"
        :type="item.type"
        :index="x"
      >
        <MissionCreateSurveyItemSelectQuestion
          v-if="[SINGLE_SELECT, MULTI_SELECT].includes(item.type)"
          :index="x"
        />
        <MissionCreateSurveyItemLinearScaleQuestion
          v-else-if="item.type === LINEAR_SCALE"
          :index="x"
        />
        <MissionCreateSurveyItemLikertQuestion
          v-else-if="item.type === LIKERT"
          :index="x"
        />
        <MissionCreateSurveyItemFirstClick
          v-else-if="item.type === FIRST_CLICK"
        />
      </MissionCreateSurveyItem>
    </draggable>
  </div>
</template>

<script>
import { MISSION_SURVEY_ITEMS, MISSION_SURVEY_USABILITY_LAB_ITEMS } from '../../constants'
import MissionCreateSurveyItemSelectQuestion
  from '../MissionCreateSurveyItemSelectQuestion/MissionCreateSurveyItemSelectQuestion'
import MissionCreateSurveyItemLinearScaleQuestion
  from '../MissionCreateSurveyItemLinearScaleQuestion/MissionCreateSurveyItemLinearScaleQuestion'
import MissionCreateSurveyItem from '../MissionCreateSurveyItem/MissionCreateSurveyItem'
import MissionCreateSurveyItemLikertQuestion
  from '../MissionCreateSurveyItemLikertQuestion/MissionCreateSurveyItemLikertQuestion'
import MissionCreateSurveyItemFirstClick from '../MissionCreateSurveyItemFirstClick/MissionCreateSurveyItemFirstClick'

export default {
  name: 'MissionCreateSurveyItems',
  components: { MissionCreateSurveyItemFirstClick, MissionCreateSurveyItemLikertQuestion, MissionCreateSurveyItem, MissionCreateSurveyItemLinearScaleQuestion, MissionCreateSurveyItemSelectQuestion },
  data() {
    const { SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LINEAR_SCALE, LIKERT } = MISSION_SURVEY_ITEMS
    const { FIRST_CLICK } = MISSION_SURVEY_USABILITY_LAB_ITEMS
    return { SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LINEAR_SCALE, LIKERT, FIRST_CLICK }
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
  @import "MissionCreateSurveyItems";
</style>
