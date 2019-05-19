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
    <ButtonText text="Update" :disabled="!formValid" @click="submit" @disabledClick="showErrors = true" />
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
    titleError() { return this.s.title !== '' ? null : 'required' },
    formValid() {
      return !this.titleError
    }
  },
  methods: {
    submit() {
      // TODO: API submit
      this.$store.commit('projectForm/pending')
      window.setTimeout(() => {
        this.$store.commit('projectForm/submitted')
        this.$store.commit('projectForm/setOverlayOpened', false)
      }, 1000)
    }
  }
}
</script>
