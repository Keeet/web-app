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
  fetch({ app: { $fetch }, params: { id } }) {
    return $fetch([{ name: 'USER' }, { name: 'MISSION', id }])
  }
}
</script>
