<template>
  <div>
    <Input
      title="Name"
      :value="s.title"
      mutation="missionMetadataForm/setTitle"
      placeholder="Mission name"
      :error="titleError"
      :disable-error="!showErrors"
    />
    <Input
      title="Description"
      :value="s.description"
      mutation="missionMetadataForm/setDescription"
      placeholder="Enter you mission description here to explain what you want to achieve with this research session..."
      textarea
    />
    <ButtonText
      text="Update"
      :disabled="!formValid"
      @click="$store.dispatch('missionMetadataForm/submit')"
      @disabledClick="showErrors = true"
    />
  </div>
</template>

<script>
import Input from '../../_shared/Input/Input'
import ButtonText from '../../_shared/ButtonText/ButtonText'

export default {
  name: 'MissionMetadataForm',
  components: { ButtonText, Input },
  data() {
    return { showErrors: false }
  },
  computed: {
    s() {
      return this.$store.state.missionMetadataForm
    },
    titleError() { return this.s.title !== '' ? null : 'required' },
    formValid() {
      return !this.titleError
    }
  }
}
</script>
