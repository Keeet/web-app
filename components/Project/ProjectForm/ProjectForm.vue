<template>
  <div class="project-form">
    <Input
      title="Name"
      :value="s.title"
      mutation="projectForm/setTitle"
      placeholder="Project name"
      :error="titleError"
      :disable-error="!showErrors"
    />
    <Input
      title="Description"
      :value="s.description"
      mutation="projectForm/setDescription"
      placeholder="Enter you project description here to explain what you want to achieve with this research session …"
      textarea
    />
    <ButtonText
      text="Update"
      :disabled="!formValid"
      @click="$store.dispatch('projectForm/submit')"
      @disabledClick="showErrors = true"
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
  }
}
</script>
