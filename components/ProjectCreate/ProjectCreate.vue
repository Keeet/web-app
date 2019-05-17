<template>
  <div class="project-create">
    <div class="project-create-cancel">
      <ButtonCircle type="ARROW_LEFT" @click="$router.back()" />
    </div>
    <div class="project-create-form">
      <Headline text="Give your project a name!" center />
      <div class="project-create-form-input">
        <Input
          type="UNDERLINED_LARGE"
          :value="s.title"
          :error="titleError"
          mutation="projectForm/setTitle"
          placeholder="Project Name"
          :disable-error="!showErrors"
        />
      </div>
      <div class="project-create-form-submit">
        <ButtonText text="Create" :disabled="!formValid" @click="submit" @disabledClick="showErrors = true" />
      </div>
    </div>
  </div>
</template>

<script>
import Headline from '../_shared/Headline/Headline'
import Input from '../_shared/Input/Input'
import ButtonText from '../_shared/ButtonText/ButtonText'
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
export default {
  name: 'ProjectCreate',
  components: { ButtonCircle, ButtonText, Input, Headline },
  data() {
    return { showErrors: false }
  },
  computed: {
    s() {
      return this.$store.state.projectForm
    },
    titleError() { return this.s.title !== '' ? null : 'required' },
    formValid() {
      return !this.titleError
    }
  },
  methods: {
    submit() {
      // TODO: API submit
      const id = '12345'
      this.$router.push(`/projects/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "ProjectCreate";
</style>
