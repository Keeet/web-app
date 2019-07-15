<template>
  <div :id="id" class="select-custom" :class="{ opened, error: showError }">
    <div class="select-custom-head" :class="{ noHeadBorder, smallAngle }" @click="$emit('clickHead')">
      <div v-if="!value && placeholder" class="select-custom-head-empty">
        <p class="select-custom-head-placeholder">
          {{ placeholder }}
        </p>
      </div>
      <div>
        <slot v-if="value" name="selected" />
      </div>
      <IconAngleDown />
    </div>
    <div v-if="opened" class="select-custom-options">
      <div
        v-for="(option, x) in options"
        :key="x"
        class="select-custom-options-item"
        :class="{ selected: value === option }"
        @click="$emit('select', option)"
      >
        <slot :name="option" />
      </div>
    </div>
    <p class="select-custom-error" :class="{active: showError}">
      {{ error }}
    </p>
  </div>
</template>

<script>
import uuidv4 from 'uuid/v4'

export default {
  name: 'SelectCustom',
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
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
    noHeadBorder: {
      type: Boolean,
      default: false
    },
    smallAngle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { id: uuidv4() }
  },
  computed: {
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
  @import "SelectCustom";
</style>
