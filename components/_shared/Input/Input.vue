<template>
  <div class="input" :class="type">
    <p v-if="title" class="input-title">
      {{ title }}
    </p>
    <input
      v-model="message"
      class="input-field"
      :class="{error: showError}"
      :placeholder="placeholder"
      :readonly="readonly"
      :maxlength="maxCharacters || 524288"
    >
    <p class="input-error" :class="{active: showError}">
      {{ error }}
    </p>
  </div>
</template>

<script>
const TYPES = {
  DEFAULT: 'DEFAULT',
  UNDERLINED_LARGE: 'UNDERLINED_LARGE'
}

export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      default: TYPES.DEFAULT,
      validator: value => Object.values(TYPES).includes(value)
    },
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
    },
    maxCharacters: {
      type: Number,
      default: null
    }
  },
  computed: {
    message: {
      get() {
        return this.value
      },
      set(value) {
        if (!this.maxCharacters || this.maxCharacters >= value.length) {
          this.$store.commit(this.mutation, value)
        }
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
