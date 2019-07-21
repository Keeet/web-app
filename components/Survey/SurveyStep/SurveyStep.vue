<template>
  <div class="survey-step">
    <div class="survey-step-progress">
      <div
        class="survey-step-progress-bar"
        :style="{ width: `${s.form.progress * 100}%`, backgroundColor: s.color }"
      />
    </div>
    <p v-if="isPreview()" class="survey-step-preview" :style="{ backgroundColor: s.color }">
      {{ $t('survey.preview.banner', s.language) }}
    </p>
    <div class="survey-step-body">
      <slot />
    </div>
    <div
      class="survey-step-button"
      :class="[{ buttonDisabled }, activeRootItem ? activeRootItem.type : '']"
    >
      <div class="survey-step-button-inner">
        <ButtonText
          :text="isCint ? $t('survey.backToCintButton', s.language) : buttonText || $t('survey.nextButton', s.language)"
          :bg-color="s.color"
          no-margin
          @click="clickButton"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonText from '../../_shared/ButtonText/ButtonText'
export default {
  name: 'SurveyStep',
  components: { ButtonText },
  props: {
    buttonText: {
      type: String,
      default: null
    },
    buttonLink: {
      type: String,
      default: null
    },
    buttonDisabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    s() {
      return {
        ...this.$store.state.survey,
        form: this.$store.state.surveyForm
      }
    },
    activeRootItem() {
      return this.$store.getters['surveyForm/activeRootItem']
    },
    activeItem() {
      return this.$store.getters['surveyForm/activeItem']
    },
    isCint() {
      const { form: { activeClosing, orderId, cintUserId } } = this.s
      return activeClosing && orderId && cintUserId
    }
  },
  watch: {
    activeItem: {
      immediate: true,
      handler() {
        if (process.client) {
          this.track()
        }
      }
    }
  },
  methods: {
    isPreview() {
      return this.$route.params.id === 'preview'
    },
    nextStep() {
      this.$store.dispatch('surveyForm/nextStep')
    },
    track() {
      if (!this.isPreview()) {
        const { id, type, form: { activeWelcome, activeClosing } } = this.s
        const isInput = !activeWelcome && !activeClosing
        this.$mpSurvey.track(this.getTrackingEvent(), {
          missionId: id,
          missionType: type,
          inputId: isInput ? this.activeItem.id : undefined,
          inputType: isInput ? this.activeItem.type : undefined
        })
      }
    },
    getTrackingEvent() {
      if (this.s.form.activeWelcome) {
        return 'enterWelcome'
      } else if (this.s.form.activeClosing) {
        return 'enterClosing'
      } else {
        return 'enterInput'
      }
    },
    clickButton() {
      const { cintProjectToken } = this.s
      if (this.isCint) {
        this.redirect(`https://s.cint.com/Survey/Complete?ProjectToken=${cintProjectToken}`)
        return
      }
      if (this.buttonLink) {
        this.redirect(this.buttonLink)
        return
      }
      this.nextStep()
    },
    redirect(link) {
      const { id, type, form: { activeClosing } } = this.s
      if (activeClosing) {
        this.$mpSurvey.track('clickClosingRedirect', {
          missionId: id,
          missionType: type
        })
        window.setTimeout(() => {
          window.location = link
        }, 500)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SurveyStep";
</style>
