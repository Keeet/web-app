<template>
  <div class="persona-step">
    <slot />
    <div class="persona-step-nav">
      <ButtonText v-if="showNext" text="Next" type="BLUE" arrow="RIGHT" :disabled="!valid" />
      <ButtonText v-if="showPrev" text="Back" type="BLUE_BORDER" arrow="LEFT" />
    </div>
  </div>
</template>

<script>
import ButtonText from '../../_shared/ButtonText/ButtonText'
export default {
  name: 'PersonaStep',
  components: { ButtonText },
  props: {
    showNext: {
      type: Boolean,
      default: true
    },
    showPrev: {
      type: Boolean,
      default: true
    },
    valid: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "PersonaStep";
</style>
