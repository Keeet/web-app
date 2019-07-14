<template>
  <div class="mission-create-survey-item-follow-up-question" :class="{ first: followUpIndex === 0 }">
    <div class="mission-create-survey-item-follow-up-question-head">
      <div class="mission-create-survey-item-follow-up-question-drag">
        <IconDragDrop />
      </div>
      <div class="mission-create-survey-item-follow-up-question-text">
        <MissionCreateSurveyItemQuestion
          :index="itemIndex"
          :title="questionTitle"
          :follow-up-index="followUpIndex"
          :type="followUp.type"
          :required="followUp.required"
          :value="followUp.text"
          :bg-color-class="item.type"
          no-margin
        />
      </div>
      <div class="mission-create-survey-item-follow-up-question-type">
        <SelectCustom
          v-closable="{
            handler: 'closeSelect'
          }"
          :opened="selectOpened"
          :value="followUp.type"
          :options="questionTypes"
          @clickHead="selectOpened = !selectOpened"
          @select="selectType"
        >
          <template slot="selected">
            <div class="mission-create-survey-item-follow-up-question-type-item selected">
              <div class="mission-create-survey-item-follow-up-question-type-item-icon" :class="item.type">
                <MissionSurveyIcon :type="followUp.type" />
              </div>
              <p class="mission-create-survey-item-follow-up-question-type-item-label">
                {{ MISSION_SURVEY_ITEM_LABELS[followUp.type] }}
              </p>
            </div>
          </template>
          <template v-for="(type, x) in questionTypes" :slot="type">
            <div :key="x" class="mission-create-survey-item-follow-up-question-type-item">
              <div class="mission-create-survey-item-follow-up-question-type-item-icon" :class="item.type">
                <MissionSurveyIcon :type="type" />
              </div>
              <p class="mission-create-survey-item-follow-up-question-type-item-label">
                {{ MISSION_SURVEY_ITEM_LABELS[type] }}
              </p>
            </div>
          </template>
        </SelectCustom>
      </div>
      <div
        v-if="!noDelete"
        class="mission-create-survey-item-follow-up-question-delete"
        @click="deleteFollowUp"
      >
        <IconDelete />
      </div>
    </div>
    <div class="mission-create-survey-item-follow-up-question-body" :class="{ noDelete }">
      <MissionCreateSurveyItemSelectQuestion
        v-if="[SINGLE_SELECT, MULTI_SELECT].includes(followUp.type)"
        :index="itemIndex"
        :follow-up-index="followUpIndex"
        :bg-color-class="item.type"
      />
      <MissionCreateSurveyItemLinearScaleQuestion
        v-else-if="followUp.type === LINEAR_SCALE"
        :index="itemIndex"
        :follow-up-index="followUpIndex"
      />
      <MissionCreateSurveyItemLikertQuestion
        v-else-if="followUp.type === LIKERT"
        :index="itemIndex"
        :follow-up-index="followUpIndex"
      />
    </div>
  </div>
</template>

<script>
import { MISSION_SURVEY_ITEMS, MISSION_SURVEY_ITEM_LABELS, MISSION_SURVEY_USABILITY_LAB_FOLLOW_UP_REQUIRED } from '../../constants'
import MissionCreateSurveyItemQuestion from '../MissionCreateSurveyItemQuestion/MissionCreateSurveyItemQuestion'
import SelectCustom from '../../_shared/SelectCustom/SelectCustom'
import MissionCreateSurveyItemLinearScaleQuestion
  from '../MissionCreateSurveyItemLinearScaleQuestion/MissionCreateSurveyItemLinearScaleQuestion'
import MissionCreateSurveyItemSelectQuestion
  from '../MissionCreateSurveyItemSelectQuestion/MissionCreateSurveyItemSelectQuestion'
import MissionCreateSurveyItemLikertQuestion
  from '../MissionCreateSurveyItemLikertQuestion/MissionCreateSurveyItemLikertQuestion'
import MissionSurveyIcon from '../../_shared/MissionSurveyIcon/MissionSurveyIcon'
export default {
  name: 'MissionCreateSurveyItemFollowUpQuestion',
  components: {
    MissionSurveyIcon,
    MissionCreateSurveyItemLikertQuestion,
    MissionCreateSurveyItemSelectQuestion,
    MissionCreateSurveyItemLinearScaleQuestion,
    SelectCustom,
    MissionCreateSurveyItemQuestion },
  props: {
    itemIndex: {
      type: Number,
      required: true
    },
    followUpIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    const { SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LINEAR_SCALE, LIKERT } = MISSION_SURVEY_ITEMS
    return {
      selectOpened: false,
      MISSION_SURVEY_ITEM_LABELS,
      SHORT_TEXT,
      LONG_TEXT,
      SINGLE_SELECT,
      MULTI_SELECT,
      LINEAR_SCALE,
      LIKERT
    }
  },
  computed: {
    s() {
      return this.$store.state.missionFormSurvey
    },
    item() {
      return this.s.items[this.itemIndex]
    },
    followUps() {
      return this.item.followUps
    },
    followUp() {
      return this.followUps[this.followUpIndex]
    },
    questionTypes() {
      return Object.keys(MISSION_SURVEY_ITEMS)
    },
    atLeastOneRequired() {
      return MISSION_SURVEY_USABILITY_LAB_FOLLOW_UP_REQUIRED.includes(this.item.type)
    },
    noDelete() {
      return this.followUps.length <= 1 && this.atLeastOneRequired
    },
    questionTitle() {
      return `${this.itemIndex + 1} ${String.fromCharCode(this.followUpIndex + 97)}. ${this.MISSION_SURVEY_ITEM_LABELS[this.followUp.type]} question`
    }
  },
  methods: {
    closeSelect() {
      this.selectOpened = false
    },
    selectType(type) {
      this.$store.commit('missionFormSurvey/changeItemFollowUp', {
        type,
        itemIndex: this.itemIndex,
        followUpIndex: this.followUpIndex
      })
      this.closeSelect()
    },
    deleteFollowUp() {
      this.$store.commit('missionFormSurvey/deleteItemFollowUp', {
        itemIndex: this.itemIndex,
        followUpIndex: this.followUpIndex
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionCreateSurveyItemFollowUpQuestion";
</style>
