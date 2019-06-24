<template>
  <div
    data-aos="fade-in"
    data-aos-duration="700"
    data-aos-once="true"
  >
    <div class="mission-create-survey">
      <div class="mission-create-survey-content">
        <MissionCreateSurveyDetails />
        <MissionCreateSurveyCustomScreen
          type="WELCOME"
          title="Default Welcome Screen"
          subtitle="The first thing your audience will see - a great opportunity to engage right away."
        />
        <MissionCreateSurveyItems />
        <MissionCreateSurveyAdd :index="items.length" />
        <MissionCreateSurveyCustomScreen
          type="CLOSING"
          title="Default Thank You Screen"
          subtitle="The last thing your audience will see. Thank your participants for their effort and time."
        />
      </div>
      <MissionCreateSurveySummary
        :is-valid="isValid"
        @submitClick="submit"
        @submitDisabledClick="submitDisabledClick"
      />
    </div>
  </div>
</template>

<script>
import { MISSION_SURVEY_ITEMS } from '../../constants'
import { scrollToTopId } from '../../../utils/scrollUtils'
import MissionCreateSurveyDetails from '../MissionCreateSurveyDetails/MissionCreateSurveyDetails'
import MissionCreateSurveyCustomScreen from '../MissionCreateSurveyCustomScreen/MissionCreateSurveyCustomScreen'
import MissionCreateSurveyItems from '../MissionCreateSurveyItems/MissionCreateSurveyItems'
import MissionCreateSurveyAdd from '../MissionCreateSurveyAdd/MissionCreateSurveyAdd'
import MissionCreateSurveySummary from '../MissionCreateSurveySummary/MissionCreateSurveySummary'

export default {
  name: 'MissionCreateSurvey',
  components: { MissionCreateSurveySummary, MissionCreateSurveyAdd, MissionCreateSurveyItems, MissionCreateSurveyCustomScreen, MissionCreateSurveyDetails },
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
    isValid() {
      return this.s.invalidFields.length === 0
    }
  },
  methods: {
    submitDisabledClick() {
      if (!this.s.showErrors) {
        this.$store.commit('missionForm/showErrors')
      }
      scrollToTopId(this.s.invalidFields.map(field => field.id))
    },
    buildMission() {
      const { projectId, type, title, language } = this.s
      const { welcomeTitle, welcomeDescription, welcomeLogoId, closingTitle, closingDescription, closingLogoId, redirectLink, color, items, requiredCount } = this.s.survey
      const mission = {
        projectId,
        type,
        title,
        language,
        welcomeTitle,
        welcomeDescription,
        welcomeLogoId,
        closingTitle,
        closingDescription,
        closingLogoId,
        redirectLink,
        color,
        items,
        requiredCount
      }
      function formatItems(items) {
        const { SINGLE_SELECT, MULTI_SELECT } = MISSION_SURVEY_ITEMS
        return items.map((item) => {
          // clear empty choices
          if ([SINGLE_SELECT, MULTI_SELECT].includes(item.type)) {
            item.choices = item.choices.filter(choice => choice !== '')
          }
          if (item.followUps) {
            item.followUps = formatItems(item.followUps)
          }
          return item
        })
      }
      mission.items = formatItems(mission.items)
      mission.color = mission.color.hex

      return mission
    },
    submit() {
      this.$store.commit('missionForm/pending')
      this.$push.createMissionSurvey(this.buildMission()).then(({ id }) => {
        this.$store.commit('missionForm/setSubmittedMissionId', id)
        this.$router.push(`/missions/${id}`)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurvey";
</style>
