<template>
  <div>
    <MissionCreateRecruitStep
      :index="1"
    >
      <MissionCreateRecruitForm :show-errors="s.showErrors" />
    </MissionCreateRecruitStep>
    <MissionCreateRecruitStep
      :index="2"
    >
      <MissionCreateRecruitPersona />
    </MissionCreateRecruitStep>
    <MissionCreateRecruitStep
      :index="3"
      subheadline="When are you able to conduct the interview / test?"
    >
      <MissionCreateRecruitCalendar />
    </MissionCreateRecruitStep>
    <MissionCreateRecruitStep
      :index="4"
      last
    >
      <MissionCreateRecruitSummary @submit="submit" />
    </MissionCreateRecruitStep>
  </div>
</template>

<script>
import { MISSIONS } from '../../constants'
import MissionCreateRecruitForm from '../MissionCreateRecruitForm/MissionCreateRecruitForm'
import MissionCreateRecruitCalendar from '../MissionCreateRecruitCalendar/MissionCreateRecruitCalendar'
import MissionCreateRecruitSummary from '../MissionCreateRecruitSummary/MissionCreateRecruitSummary'
import MissionCreateRecruitStep from '../MissionCreateRecruitStep/MissionCreateRecruitStep'
import MissionCreateRecruitPersona from '../MissionCreateRecruitPersona/MissionCreateRecruitPersona'

export default {
  name: 'MissionCreateRecruit',
  components: {
    MissionCreateRecruitPersona,
    MissionCreateRecruitStep,
    MissionCreateRecruitSummary,
    MissionCreateRecruitCalendar,
    MissionCreateRecruitForm
  },
  computed: {
    s() {
      const { missionForm, missionFormRecruit } = this.$store.state
      return {
        ...missionForm,
        recruit: missionFormRecruit
      }
    }
  },
  methods: {
    buildMission() {
      const { projectId, type, title, language } = this.s
      const { duration, persona, sessions, location } = this.s.recruit
      const mission = {
        projectId,
        type,
        title,
        duration: parseInt(duration),
        language,
        persona,
        sessions: sessions.map(session => session.start.toISOString())
      }
      if (type === MISSIONS.IN_HOUSE) {
        const { country, city, zipCode, street, houseNumber, addressDescription } = location
        return {
          ...mission,
          country,
          city,
          zipCode,
          street,
          houseNumber,
          addressDescription
        }
      }
      return mission
    },
    submit() {
      this.$store.commit('missionForm/pending')
      this.$push.createMissionRecruit(this.buildMission()).then(({ id }) => {
        this.$store.commit('missionForm/setSubmittedMissionId', id)
        this.$store.commit('missionFormRecruit/showSubmittedPopup')
      })
    }
  }
}
</script>
