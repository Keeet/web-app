<template>
  <MissionSurveyOrder />
</template>

<script>
import MissionSurveyOrder from '../../../components/MissionSurveyOrder/MissionSurveyOrder'
export default {
  name: 'Order',
  components: { MissionSurveyOrder },
  layout: 'defaultNoFooter',
  validate({ params: { id } }) {
    return !!id
  },
  fetch({ app: { $fetch }, store, params: { id } }) {
    return new Promise((resolve) => {
      $fetch([{ name: 'USER' }, { name: 'MISSION', id }, { name: 'SURVEY', id }]).then(() => {
        store.commit('missionForm/init', { project: null, participants: 50 })
        store.commit('missionFormSurvey/init')
        store.commit('missionFormPersona/init')
        store.commit('missionFormSurvey/setItems', store.state.survey.items)
        store.dispatch('missionFormSurvey/fetchPricing', {
          globalGetters: store.getters,
          missionForm: store.state.missionForm
        }).then(resolve)
      })
    })
  }
}
</script>
