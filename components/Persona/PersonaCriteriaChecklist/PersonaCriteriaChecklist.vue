<template>
  <div class="persona-criteria-checklist">
    <div
      v-for="(key, x) in values"
      :key="x"
      class="persona-criteria-checklist-item"
    >
      <input
        :id="getUniqueId(x)"
        v-model="selected"
        :value="key"
        type="checkbox"
        class="persona-criteria-checklist-input"
      >
      <label class="persona-criteria-checklist-input-label" :for="getUniqueId(x)">
        <span class="persona-criteria-checklist-input-label-icon">
          <IconCheck />
        </span>
        <span class="persona-criteria-checklist-input-label-text">
          {{ labels[key] }}
        </span>
      </label>
    </div>
  </div>
</template>

<script>
import { specialCharsToDashes } from '../../../utils/stringUtils'

export default {
  name: 'PersonaCriteriaChecklist',
  props: {
    values: {
      type: Array,
      required: true
    },
    labels: {
      type: Object,
      required: true
    },
    mutation: {
      type: String,
      required: true
    },
    value: {
      type: Array,
      required: true
    }
  },
  computed: {
    selected: {
      get() {
        return this.value
      },
      set(value) {
        this.$store.commit(this.mutation, value)
      }
    }
  },
  methods: {
    getUniqueId(index) {
      return `${specialCharsToDashes(this.mutation)}-${index}`
    }
  }
}
</script>

<style scoped lang="scss">
  @import "PersonaCriteriaChecklist";
</style>
