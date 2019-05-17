<template>
  <div class="persona-criteria-box" :class="{opened}">
    <div
      class="persona-criteria-box-head"
      @click="open"
    >
      <p class="persona-criteria-box-head-text">
        {{ headline }}
      </p>
      <ButtonCircle v-show="!opened" type="CREATE_SMALL" no-hover />
      <div v-show="opened" class="persona-criteria-box-head-close" @click.stop="close">
        <IconCancel />
      </div>
    </div>
    <div v-show="opened" class="persona-criteria-box-body">
      <slot />
    </div>
  </div>
</template>

<script>
import ButtonCircle from '../../_shared/ButtonCircle/ButtonCircle'
export default {
  name: 'PersonaCriteriaBox',
  components: { ButtonCircle },
  props: {
    headline: {
      type: String,
      required: true
    },
    opened: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    open() {
      if (!this.opened) {
        this.$emit('open')
      }
    },
    close() {
      if (this.opened) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "PersonaCriteriaBox";;
</style>
