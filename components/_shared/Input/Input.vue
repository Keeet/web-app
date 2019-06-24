<template>
  <div class="input" :class="[type, { noMargin }]">
    <p v-if="title" class="input-title">
      {{ title }}
    </p>
    <div class="input-wrapper" :class="{error: showError}">
      <input
        v-if="!textarea"
        :id="id"
        v-model="message"
        class="input-field"
        :placeholder="placeholder"
        :readonly="readonly"
        :maxlength="maxCharacters || 524288"
        @keyup.enter="$emit('enter')"
        @focusout="$emit('focusout')"
      >
      <textarea
        v-else
        :id="id"
        v-model="message"
        class="input-field textarea"
        :placeholder="placeholder"
        :readonly="readonly"
        :maxlength="maxCharacters || 524288"
        @focusout="$emit('focusout')"
      />
      <div v-if="$slots.additional" class="input-additional">
        <slot name="additional" />
      </div>
    </div>
    <p class="input-error" :class="{active: showError, noTitle: !title, noMargin}">
      {{ error }}
    </p>
  </div>
</template>

<script>
import uuidv4 from 'uuid/v4'

const TYPES = {
  DEFAULT: 'DEFAULT',
  UNDERLINED: 'UNDERLINED',
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
    dispatchError: {
      type: String,
      default: undefined
    },
    disableError: {
      type: Boolean,
      default: false
    },
    mutation: {
      type: String,
      default: null
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
    },
    textarea: {
      type: Boolean,
      default: false
    },
    noMargin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { id: uuidv4() }
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
    },
    showError() {
      return this.error && !this.disableError
    }
  },
  watch: {
    error: {
      immediate: true,
      handler(error) {
        if (this.dispatchError) {
          this.$store.dispatch(this.dispatchError, { id: this.id, error })
        }
      }
    }
  },
  beforeDestroy() {
    if (this.dispatchError) {
      this.$store.dispatch(this.dispatchError, { id: this.id, error: null })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "Input";
</style>
