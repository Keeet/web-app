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
    return $fetch(
      [{ name: 'USER' }, { name: 'MISSION', id }, { name: 'SURVEY', id }, { name: 'COMPANY' }],
      () => {
        store.dispatch('missionForm/initSurveyOrder', { project: null })
        store.commit('missionFormSurvey/init')
        store.commit('missionFormPersona/init')
        store.commit('missionFormPersona/setCountry', store.state.company.country)
        store.commit('missionFormSurvey/setItems', store.state.survey.items)
        return store.dispatch('missionFormSurvey/fetchPricing', {
          globalGetters: store.getters,
          missionForm: store.state.missionForm,
          missionFormPersona: store.state.missionFormPersona
        })
      }
    )
  }
}
</script>
