<template>
  <div class="mission-create-survey-add-box-item" @click="addItem">
    <div class="mission-create-survey-add-box-item-icon" :class="type">
      <MissionSurveyIcon :type="type" />
    </div>
    <div class="mission-create-survey-add-box-item-text">
      <p class="mission-create-survey-add-box-item-text-title">
        {{ label }}
      </p>
      <p class="mission-create-survey-add-box-item-text-description">
        {{ $t(`missionCreate.survey.items.addBox.${DESCRIPTION_I18N_KEYS[type]}`, $store.state.locale) }}
      </p>
    </div>
  </div>
</template>

<script>
import { MISSIONS, MISSION_SURVEY_ITEM_LABELS, MISSION_SURVEY_ITEMS, MISSION_SURVEY_USABILITY_LAB_ITEMS, MISSION_SURVEY_USABILITY_LAB_ITEM_LABELS } from '../../constants'
import MissionSurveyIcon from '../../_shared/MissionSurveyIcon/MissionSurveyIcon'

const DESCRIPTION_I18N_KEYS = {
  SHORT_TEXT: 'shortTextDescription',
  LONG_TEXT: 'longTextDescription',
  SINGLE_SELECT: 'singleSelectDescription',
  MULTI_SELECT: 'multiSelectDescription',
  LINEAR_SCALE: 'linearScaleDescription',
  LIKERT: 'likertDescription',
  FIRST_CLICK: 'firstClickDescription',
  FIVE_SECOND_TEST: 'fiveSecondTestDescription',
  QUESTION_LIST: 'questionListDescription',
  DESIGN_QUESTION: 'designQuestionDescription',
  PREFERENCE_TEST: 'preferenceTestDescription',
  INSTRUCTION: 'instructionDescription'
}

export default {
  name: 'MissionCreateSurveyAddBoxItem',
  components: { MissionSurveyIcon },
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.keys({ ...MISSION_SURVEY_ITEMS, ...MISSION_SURVEY_USABILITY_LAB_ITEMS }).includes(value)
    }
  },
  data() {
    const { SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LIKERT, LINEAR_SCALE } = MISSION_SURVEY_ITEMS
    return { MISSION_SURVEY_ITEM_LABELS, DESCRIPTION_I18N_KEYS, SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LIKERT, LINEAR_SCALE }
  },
  computed: {
    s() {
      return {
        ...this.$store.state.missionForm,
        survey: this.$store.state.missionFormSurvey
      }
    },
    missionType() {
      return this.s.type
    },
    label() {
      if (this.missionType === MISSIONS.SURVEY) {
        return MISSION_SURVEY_ITEM_LABELS[this.type]
      } else if (this.missionType === MISSIONS.USABILITY_LAB) {
        return MISSION_SURVEY_USABILITY_LAB_ITEM_LABELS[this.type]
      }
      return null
    }
  },
  methods: {
    addItem() {
      this.$mpApp.trackMissionForm('addSurveyItem', this.$store)
      if (this.s.showErrors) {
        this.$store.commit('missionForm/hideErrors')
      }
      this.$store.commit('missionFormSurvey/addItem', this.type)
      this.$store.commit('missionFormSurvey/setItemAddIndex', -1)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyAddBoxItem";
</style>
