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
import uuidv4 from 'uuid'
import { MISSION_SURVEY_ITEMS } from '../../constants'
import { scrollToTopId } from '../../../utils/scrollUtils'
import MissionCreateSurveyDetails from '../MissionCreateSurveyDetails/MissionCreateSurveyDetails'
import MissionCreateSurveyCustomScreen from '../MissionCreateSurveyCustomScreen/MissionCreateSurveyCustomScreen'
import MissionCreateSurveyItems from '../MissionCreateSurveyItems/MissionCreateSurveyItems'
import MissionCreateSurveyAdd from '../MissionCreateSurveyAdd/MissionCreateSurveyAdd'
import MissionCreateSurveySummary from '../MissionCreateSurveySummary/MissionCreateSurveySummary'
import { copy } from '../../../utils/objectUtils'

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
    survey() {
      return this.s.survey
    },
    surveyJSON() {
      return JSON.stringify(this.survey)
    },
    items() {
      return this.survey.items
    },
    isValid() {
      return this.s.invalidFields.length === 0
    }
  },
  watch: {
    surveyJSON() {
      this.setPreview()
    }
  },
  methods: {
    setPreview() {
      const survey = this.buildMission()
      const urls = this.$store.state.dropzoneUploads
      survey.welcomeLogoId = survey.welcomeLogoId ? urls[survey.welcomeLogoId] : null
      survey.closingLogoId = survey.closingLogoId ? urls[survey.closingLogoId] : null
      survey.items.forEach((item, x) => {
        item.id = uuidv4()
        item.index = x
        if (item.followUps) {
          item.followUps.forEach((followUp, y) => {
            followUp.id = uuidv4()
            followUp.index = y
          })
        }
        item.image = item.imageMediaId ? urls[item.imageMediaId] : null
        item.images = item.imageMediaIds ? item.imageMediaIds.map(id => ({ url: urls[id] })) : null
      })
      window.localStorage.setItem('surveyPreview', JSON.stringify({
        ...survey,
        previewValid: this.isValid,
        lastUpdatedAt: new Date().toISOString()
      }))
    },
    submitDisabledClick() {
      if (!this.s.showErrors) {
        this.$store.commit('missionForm/showErrors')
      }
      scrollToTopId(this.s.invalidFields.map(field => field.id))
    },
    buildMission() {
      const mission = {
        ...copy(this.s),
        ...copy(this.s.survey)
      }
      delete mission.survey
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
        this.$store.commit('missionForm/submitted')
        this.$router.push(`/missions/${id}`)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurvey";
</style>
