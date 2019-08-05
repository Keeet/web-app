<template>
  <div class="project-create">
    <div class="project-create-cancel">
      <ButtonCircle type="ARROW_LEFT" @click="cancel" />
    </div>
    <div v-if="!s.pending" class="project-create-form">
      <Headline :text="$t('projectCreate.headline', $store.state.locale)" center />
      <div
        data-aos="fade-in"
        data-aos-duration="700"
        data-aos-once="true"
        :data-aos-delay="500"
      >
        <div class="project-create-form-input">
          <Input
            type="UNDERLINED_LARGE"
            :value="s.title"
            :error="titleError"
            mutation="projectForm/setTitle"
            :placeholder="$t('projectCreate.namePlaceholder', $store.state.locale)"
            :disable-error="!showErrors"
            @enter="() => { formValid ? submit() : showErrors = true }"
          />
        </div>
        <div class="project-create-form-submit">
          <ButtonText
            :text="$t('projectCreate.submitButton', $store.state.locale)"
            :disabled="!formValid"
            @click="submit"
            @disabledClick="showErrors = true"
          />
        </div>
      </div>
    </div>
    <Loading v-if="s.pending" fixed-center />
  </div>
</template>

<script>
import Headline from '../_shared/Headline/Headline'
import Input from '../_shared/Input/Input'
import ButtonText from '../_shared/ButtonText/ButtonText'
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
import Loading from '../_shared/Loading/Loading'
export default {
  name: 'ProjectCreate',
  components: { Loading, ButtonCircle, ButtonText, Input, Headline },
  data() {
    return { showErrors: false }
  },
  computed: {
    s() {
      return this.$store.state.projectForm
    },
    projects() {
      return this.$store.state.projects
    },
    titleError() {
      if (this.s.title === '') {
        return 'required'
      }
      if (this.projects.map(p => p.title).includes(this.s.title)) {
        return 'name already used'
      }
      return null
    },
    formValid() {
      return !this.titleError
    }
  },
  mounted() {
    this.$ga.page(this.$router)
  },
  methods: {
    submit() {
      this.$mpApp.trackProjectCreate('submit')
      this.$store.dispatch('projectForm/submit', { redirectToProject: true })
    },
    cancel() {
      this.$mpApp.trackProjectCreate('abort')
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "ProjectCreate";
</style>
