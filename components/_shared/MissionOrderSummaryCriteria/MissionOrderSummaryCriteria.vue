<template>
  <tr>
    <td>+ {{ PERSONA_CRITERIA_LABELS[criteria] }}</td>
    <td>{{ formattedPrice }}</td>
  </tr>
</template>

<script>
import { PERSONA_CRITERIA, PERSONA_CRITERIA_LABELS } from '../../constants'

export default {
  name: 'MissionOrderSummaryCriteria',
  props: {
    criteria: {
      type: String,
      required: true,
      validator: value => Object.keys(PERSONA_CRITERIA).includes(value)
    },
    price: {
      type: Number,
      required: true
    }
  },
  data() {
    return { PERSONA_CRITERIA_LABELS }
  },
  computed: {
    formattedPrice() {
      return this.price.toFixed(2)
    }
  }
}
</script>
