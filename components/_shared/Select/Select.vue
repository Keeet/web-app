<template>
  <div class="select" :class="{ error, noMargin }">
    <p v-if="title" class="select-title">
      {{ title }}
    </p>
    <select
      v-model="message"
      class="select-field"
      :disabled="readonly"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        class="select-option"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <p class="select-error" :class="{active: error}">
      {{ error }}
    </p>
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
      type: [String, Number],
      required: true
    },
    mutation: {
      type: String,
      default: null
    },
    error: {
      type: String,
      default: null
    },
    noMargin: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    message: {
      get() {
        return this.value
      },
      set(value) {
        if (this.mutation) {
          this.$store.commit(this.mutation, value)
        } else {
          this.$emit('change', value)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "Select";
</style>
