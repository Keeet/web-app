<template>
  <Mission />
</template>

<script>
import sampleProject from '../../../assets/samples/sampleProject'
import sampleMissionInsights from '../../../assets/samples/sampleMissionInsights'
import Mission from '../../../components/Mission/Mission'
import { MISSIONS } from '../../../components/constants'

const {
  IN_HOUSE,
  REMOTE,
  SURVEY,
  USABILITY_LAB
} = MISSIONS

export default {
  name: 'Id',
  layout: 'defaultLean',
  components: { Mission },
  validate({ params: { id } }) {
    return !!id
  },
  fetch({ app: { $fetch }, params, store, route }) {
    const IS_RECRUIT_INSIGHT = route.path.endsWith('insights')
    const IS_RECRUIT_OVERVIEW = route.path.endsWith('overview')
    const IS_SURVEY_RESULTS = route.path.endsWith('results')
    const IS_SURVEY_SHARE = route.path.endsWith('share')
    const IS_INDEX = !IS_RECRUIT_INSIGHT && !IS_RECRUIT_OVERVIEW && !IS_SURVEY_RESULTS && !IS_SURVEY_SHARE

    if (IS_RECRUIT_INSIGHT || IS_RECRUIT_OVERVIEW || IS_SURVEY_RESULTS || IS_SURVEY_SHARE) {
      store.commit('missionPage/disableAnimation', true)
    } else {
      store.commit('missionPage/disableAnimation', false)
    }

    const { id } = params
    const fetchCfg = [{ name: 'USER' }]

    if (id.startsWith('sample-')) {
      store.commit('setMission', { ...sampleProject.missions[0], projectId: 'sample' })
      if (IS_RECRUIT_INSIGHT) {
        store.commit('setMissionInsights', sampleMissionInsights)
      }
    } else {
      fetchCfg.push({ name: 'MISSION', id })
      if (IS_RECRUIT_INSIGHT) {
        fetchCfg.push({ name: 'MISSION_INSIGHTS', id })
      }
    }
    return $fetch(fetchCfg).then(() => {
      const missionType = store.state.mission.type
      if (IS_RECRUIT_OVERVIEW || (IS_INDEX && [IN_HOUSE, REMOTE].includes(missionType))) {
        store.commit('missionPage/showRecruitOverview')
      } else if (IS_RECRUIT_INSIGHT) {
        store.commit('missionPage/showRecruitInsights')
      } else if (IS_SURVEY_RESULTS || (IS_INDEX && [SURVEY, USABILITY_LAB].includes(missionType))) {
        store.commit('missionPage/showSurveyResults')
      } else if (IS_SURVEY_SHARE) {
        store.commit('missionPage/showSurveyShare')
      }
    })
  }
}
</script>
