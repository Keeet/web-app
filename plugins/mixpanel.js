import Vue from 'vue'
import { firstLetterUppercase } from '../utils/stringUtils'

const devMock = {
  track: () => {},
  alias: () => {},
  identify: () => {}
}

const mpSurvey = require('mixpanel-browser')
mpSurvey.init('9cb45f865cae08d46aaf988c7acc4026')
Vue.prototype.$mpSurvey = process.env.NODE_ENV === 'production'
  ? mpSurvey
  : devMock

const mpApp = require('mixpanel-browser')
mpApp.init('6c1bce81a6ee95e4298342cd9ff334e8')
Vue.prototype.$mpApp = process.env.NODE_ENV !== 'production'
  ? {
    track: mpApp.track,
    trackProject: (eventName) => {
      mpApp.track(fullEventName('project', eventName))
    },
    trackProjectCreate: (eventName) => {
      mpApp.track(fullEventName('projectCreate', eventName))
    },
    trackMission: (eventName, store) => {
      const { mission: { id } } = store.state
      mpApp.track(fullEventName('mission', eventName), {
        id
      })
    },
    trackMissionForm: (eventName, store) => {
      const { missionForm: { type, activeStep, projectId, editExisting } } = store.state
      mpApp.track(fullEventName('missionForm', eventName), {
        type,
        activeStep,
        projectId,
        editExisting
      })
    },
    trackMissionSurveyOrder: (eventName, store) => {
      const { mission: { id } } = store.state
      mpApp.track(fullEventName('missionSurveyOrder', eventName), {
        id
      })
    },
    trackBilling: (eventName) => {
      mpApp.track(eventName('billing', eventName))
    }
  }
  : devMock

function fullEventName(baseEventName, eventName) {
  return baseEventName + firstLetterUppercase(eventName)
}
