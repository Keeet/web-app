<template>
  <div class="select-custom" :class="{ opened }">
    <div class="select-custom-head" @click="switchDropdown">
      <div v-if="!value" class="select-custom-head-empty">
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
        @click="select(option)"
      >
        <slot :name="option" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectCustom',
  props: {
    options: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: null
    }
  },
  data() {
    return { opened: false }
  },
  methods: {
    switchDropdown() {
      this.opened = !this.opened
    },
    select(option) {
      this.$emit('select', option)
      this.switchDropdown()
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SelectCustom";
</style>
