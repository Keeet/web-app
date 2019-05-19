<template>
  <div
    v-if="active"
    class="persona-step"
    :class="{large}"
  >
    <div
      data-aos="fade-up"
      data-aos-duration="1500"
      data-aos-once="true"
    >
      <slot />
    </div>
    <div
      data-aos="fade-up"
      data-aos-duration="1500"
      data-aos-once="true"
      data-aos-delay="500"
      data-aos-anchor=".content"
    >
      <div class="persona-step-nav">
        <ButtonText
          v-if="showNext && !submit"
          text="Next"
          type="BLUE"
          arrow="RIGHT"
          :disabled="!valid"
          @click="$store.commit('personaForm/nextStep')"
        />
        <ButtonText
          v-if="submit"
          :text="submit"
          type="BLUE"
          :disabled="!valid"
          @click="$emit('submit')"
        />
        <ButtonText
          v-if="showPrev"
          text="Back"
          type="BLUE_BORDER"
          arrow="LEFT"
          @click="$store.commit('personaForm/previousStep')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonText from '../../_shared/ButtonText/ButtonText'
export default {
  name: 'PersonaStep',
  components: { ButtonText },
  props: {
    active: {
      type: Boolean,
      default: false
    },
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
    },
    large: {
      type: Boolean,
      default: false
    },
    submit: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
  @import "PersonaStep";
</style>
