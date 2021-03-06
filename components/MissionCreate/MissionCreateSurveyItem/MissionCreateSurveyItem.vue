<template>
  <div>
    <MissionCreateSurveyAdd :index="index" />
    <MissionCreateBox>
      <div class="mission-create-survey-item" :class="`mission-create-survey-item-${index}`">
        <div class="mission-create-survey-item-head">
          <div class="mission-create-survey-item-head-drag">
            <IconDragDrop />
          </div>
          <MissionSurveyIconIndexed
            :type="type"
            :index="index + 1"
          />
          <p class="mission-create-survey-item-head-title">
            {{ label }}
          </p>
          <div class="mission-create-survey-item-head-delete" @click="deleteItem">
            <IconDelete />
          </div>
        </div>
        <hr class="mission-create-survey-item-separator">
        <div class="mission-create-survey-item-body">
          <MissionCreateSurveyItemQuestion
            v-if="s.type === MISSIONS.SURVEY"
            :index="index"
            :type="item.type"
            :value="item.text"
            :required="item.required"
          />
          <slot />
          <MissionCreateSurveyItemFollowUp
            v-if="s.type === MISSIONS.USABILITY_LAB && item.followUps"
            :index="index"
          />
        </div>
      </div>
    </MissionCreateBox>
  </div>
</template>

<script>
import MissionCreateBox from '../MissionCreateBox/MissionCreateBox'
import { MISSIONS, MISSION_SURVEY_ITEM_LABELS, MISSION_SURVEY_ITEMS, MISSION_SURVEY_USABILITY_LAB_ITEMS, MISSION_SURVEY_USABILITY_LAB_ITEM_LABELS } from '../../constants'
import MissionCreateSurveyItemQuestion from '../MissionCreateSurveyItemQuestion/MissionCreateSurveyItemQuestion'
import MissionCreateSurveyAdd from '../MissionCreateSurveyAdd/MissionCreateSurveyAdd'
import MissionCreateSurveyItemFollowUp from '../MissionCreateSurveyItemFollowUp/MissionCreateSurveyItemFollowUp'
import MissionSurveyIconIndexed from '../../_shared/MissionSurveyIconIndexed/MissionSurveyIconIndexed'

export default {
  name: 'MissionCreateSurveyItem',
  components: { MissionSurveyIconIndexed, MissionCreateSurveyItemFollowUp, MissionCreateSurveyAdd, MissionCreateSurveyItemQuestion, MissionCreateBox },
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.keys({ ...MISSION_SURVEY_ITEMS, ...MISSION_SURVEY_USABILITY_LAB_ITEMS }).includes(value)
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return { MISSIONS, MISSION_SURVEY_ITEM_LABELS }
  },
  computed: {
    s() {
      return {
        ...this.$store.state.missionForm,
        survey: this.$store.state.missionFormSurvey
      }
    },
    items() {
      return this.s.survey.items
    },
    item() {
      return this.items[this.index]
    },
    label() {
      if (this.s.type === MISSIONS.SURVEY) {
        return MISSION_SURVEY_ITEM_LABELS[this.type]
      } else if (this.s.type === MISSIONS.USABILITY_LAB) {
        return MISSION_SURVEY_USABILITY_LAB_ITEM_LABELS[this.type]
      }
      return null
    }
  },
  methods: {
    deleteItem() {
      this.$mpAppHelper.trackMissionForm('deleteSurveyItem', this.$store)
      this.$store.commit('missionFormSurvey/deleteItem', this.index)
      if (this.items.length) {
        this.$store.commit('missionFormSurvey/setItemAddIndex', -1)
      } else {
        this.$store.commit('missionFormSurvey/setItemAddIndex', 0)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyItem";
</style>
