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
  fetch({ app: { $fetch }, params: { id }, store, route, error }) {
    const ACTIVE_PAGE = {
      IS_RECRUIT_INSIGHT: route.path.endsWith('insights'),
      IS_RECRUIT_OVERVIEW: route.path.endsWith('overview'),
      IS_SURVEY_RESULTS: route.path.endsWith('results'),
      IS_SURVEY_SHARE: route.path.endsWith('share')
    }

    disableAnimationOnMissionSubPage(store, ACTIVE_PAGE)

    if (id.startsWith('sample-')) {
      if (isInvalidSamplePage(ACTIVE_PAGE)) {
        return error({ statusCode: 404, message: `invalid sample mission page: ${route.path}` })
      }
      setSampleMissionAndPage(store, id, ACTIVE_PAGE)
      return $fetch([{ name: 'USER' }])
    }

    const fetchCfg = [{ name: 'USER' }, { name: 'MISSION', id }]
    if (ACTIVE_PAGE.IS_RECRUIT_INSIGHT) {
      fetchCfg.push({ name: 'MISSION_INSIGHTS', id })
    }
    return $fetch(fetchCfg, () => {
      const missionType = store.state.mission.type
      setMissionPage(store, missionType, ACTIVE_PAGE)

      if (isSurveyMission(missionType)) {
        return $fetch([{ name: 'SURVEY', id }])
      }
    })
  }
}

function disableAnimationOnMissionSubPage(store, {
  IS_RECRUIT_INSIGHT,
  IS_RECRUIT_OVERVIEW,
  IS_SURVEY_RESULTS,
  IS_SURVEY_SHARE
}) {
  if (IS_RECRUIT_INSIGHT || IS_RECRUIT_OVERVIEW || IS_SURVEY_RESULTS || IS_SURVEY_SHARE) {
    store.commit('missionPage/disableAnimation', true)
  } else {
    store.commit('missionPage/disableAnimation', false)
  }
}

function isInvalidSamplePage({ IS_SURVEY_SHARE }) {
  return IS_SURVEY_SHARE
}

function setSampleMissionAndPage(store, id, activePage) {
  const sampleMission = sampleProject.missions.find(mission => mission.id === id)
  store.commit('setMission', {
    ...sampleMission,
    isSample: true,
    projectId: 'sample'
  })
  if (isRecruitMission(sampleMission.type)) {
    if (activePage.IS_RECRUIT_INSIGHT) {
      store.commit('setMissionInsights', sampleMissionInsights)
    }
  } else if (isSurveyMission(sampleMission.type)) {
    store.commit('setSurvey', sampleMission.survey)
  }
  setMissionPage(store, sampleMission.type, activePage)
}

function setMissionPage(store, missionType, activePage) {
  const {
    IS_RECRUIT_OVERVIEW,
    IS_RECRUIT_INSIGHT,
    IS_SURVEY_RESULTS,
    IS_SURVEY_SHARE
  } = activePage
  const IS_INDEX = activePageIsIndex(activePage)

  if (IS_RECRUIT_OVERVIEW || (IS_INDEX && isRecruitMission(missionType))) {
    store.commit('missionPage/showRecruitOverview')
  } else if (IS_RECRUIT_INSIGHT) {
    store.commit('missionPage/showRecruitInsights')
  } else if (IS_SURVEY_RESULTS || (IS_INDEX && isSurveyMission(missionType))) {
    store.commit('missionPage/showSurveyResults')
  } else if (IS_SURVEY_SHARE) {
    store.commit('missionPage/showSurveyShare')
  }
}

function activePageIsIndex({ IS_RECRUIT_INSIGHT, IS_RECRUIT_OVERVIEW, IS_SURVEY_RESULTS, IS_SURVEY_SHARE }) {
  return !IS_RECRUIT_INSIGHT && !IS_RECRUIT_OVERVIEW && !IS_SURVEY_RESULTS && !IS_SURVEY_SHARE
}

function isRecruitMission(missionType) {
  return [IN_HOUSE, REMOTE].includes(missionType)
}

function isSurveyMission(missionType) {
  return [SURVEY, USABILITY_LAB].includes(missionType)
}
</script>
