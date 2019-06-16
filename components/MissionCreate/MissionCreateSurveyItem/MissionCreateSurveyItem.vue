<template>
  <div>
    <MissionCreateSurveyItemAdd :index="index" />
    <MissionCreateBox>
      <div class="mission-create-survey-item">
        <div class="mission-create-survey-item-head">
          <div class="mission-create-survey-item-head-drag">
            <IconDragDrop />
          </div>
          <div class="mission-create-survey-item-head-icon" :class="type">
            <div class="mission-create-survey-item-head-icon-inner">
              <MissionCreateSurveyIcon :type="type" />
            </div>
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
          <MissionCreateSurveyItemQuestion
            :index="index"
            :type="item.type"
            :value="item.text"
            :required="item.required"
          />
          <slot />
        </div>
      </div>
    </MissionCreateBox>
  </div>
</template>

<script>
import MissionCreateBox from '../MissionCreateBox/MissionCreateBox'
import MissionCreateSurveyIcon from '../MissionCreateSurveyIcon/MissionCreateSurveyIcon'
import { MISSION_SURVEY_ITEM_LABELS, MISSION_SURVEY_ITEMS, MISSION_SURVEY_USABILITY_HUB_ITEMS } from '../../constants'
import MissionCreateSurveyItemQuestion from '../MissionCreateSurveyItemQuestion/MissionCreateSurveyItemQuestion'
import MissionCreateSurveyItemAdd from '../MissionCreateSurveyItemAdd/MissionCreateSurveyItemAdd'

export default {
  name: 'MissionCreateSurveyItem',
  components: { MissionCreateSurveyItemAdd, MissionCreateSurveyItemQuestion, MissionCreateSurveyIcon, MissionCreateBox },
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
  computed: {
    item() {
      return this.$store.state.missionFormSurvey.items[this.index]
    }
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