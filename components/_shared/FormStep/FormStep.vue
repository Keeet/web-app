<template>
  <div
    v-if="active"
    class="form-step"
    :class="{large}"
  >
    <div
      data-aos="fade-in"
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
      <div class="form-step-nav" :class="{onlyPrev: !showNext && !submit && showPrev}">
        <ButtonText
          v-if="showNext && !submit"
          text="Next"
          type="BLUE"
          arrow="RIGHT"
          :disabled="!valid"
          @click="next"
          @disabledClick="invalidNext"
        />
        <ButtonText
          v-if="submit"
          :text="submit"
          type="BLUE"
          :disabled="!valid"
          @click="$emit('submit')"
          @disabledClick="invalidNext"
        />
        <ButtonText
          v-if="showPrev"
          text="Back"
          type="BLUE_BORDER"
          arrow="LEFT"
          @click="prev"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonText from '../../_shared/ButtonText/ButtonText'
export default {
  name: 'FormStep',
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
    },
    nextStepMutation: {
      type: String,
      default: null
    },
    prevStepMutation: {
      type: String,
      default: null
    }
  },
  methods: {
    next() {
      if (this.nextStepMutation) {
        this.$store.commit(this.nextStepMutation)
      }
    },
    prev() {
      if (this.prevStepMutation) {
        this.$store.commit(this.prevStepMutation)
      }
    },
    invalidNext() {
      this.$emit('invalidNext')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "FormStep";
</style>
