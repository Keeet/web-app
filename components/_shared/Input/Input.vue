<template>
  <div class="input">
    <p v-if="title" class="input-title">
      {{ title }}
    </p>
    <input
      class="input-field"
      :class="{error: showError}"
      :placeholder="placeholder"
      v-model="message"
      :readonly="readonly"
    />
    <p class="input-error" :class="{active: showError}">
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    title: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: null
    },
    disableError: {
      type: Boolean,
      default: false
    },
    mutation: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    readonly: {
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
        this.$store.commit(this.mutation, value)
      }
    },
    showError() {
      return this.error && !this.disableError
    }
  }
}
</script>

<style scoped lang="scss">
  @import "Input";
</style>
