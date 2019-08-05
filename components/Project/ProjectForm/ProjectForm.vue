<template>
  <div class="project-form">
    <Input
      :title="$t('project.form.nameLabel', $store.state.locale)"
      :value="s.title"
      mutation="projectForm/setTitle"
      :placeholder="$t('project.form.namePlaceholder', $store.state.locale)"
      :error="titleError"
      :disable-error="!showErrors"
    />
    <Input
      :title="$t('project.form.descriptionLabel', $store.state.locale)"
      :value="s.description"
      mutation="projectForm/setDescription"
      :placeholder="$t('project.form.descriptionPlaceholder', $store.state.locale)"
      textarea
    />
    <ButtonText
      :text="$t('project.form.submitButton', $store.state.locale)"
      :disabled="!formValid"
      @click="submit"
      @disabledClick="disabledClick"
    />
  </div>
</template>

<script>
import Input from '../../_shared/Input/Input'
import ButtonText from '../../_shared/ButtonText/ButtonText'
export default {
  name: 'ProjectForm',
  components: { ButtonText, Input },
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
      if (this.projects.filter(p => p.id !== this.s.id).map(p => p.title).includes(this.s.title)) {
        return 'name already used'
      }
      return null
    },
    formValid() {
      return !this.titleError
    }
  },
  methods: {
    disabledClick() {
      this.$mpApp.trackProject('attemptSubmitEditInvalid', this.$store)
      this.showErrors = true
    },
    submit() {
      this.$mpApp.trackProject('submitEdit', this.$store)
      this.$store.dispatch('projectForm/submit')
    }
  }
}
</script>
