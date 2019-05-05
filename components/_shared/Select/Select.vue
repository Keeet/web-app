<template>
  <div class="select">
    <p v-if="title" class="select-title">
      {{ title }}
    </p>
    <select
      class="select-field"
      v-model="message"
      :disabled="readonly"
    >
      <option
        class="select-option"
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    title: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      required: true
    },
    mutation: {
      type: String,
      required: true
    }
  },
  computed: {
    message: {
      get() {
        return this.value
      },
      set(value) {
        this.$store.commit(this.mutation, value)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "Select";
</style>
