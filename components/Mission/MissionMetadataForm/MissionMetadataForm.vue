<template>
  <div>
    <Input
      :title="$t('mission.metadataForm.nameLabel', $store.state.locale)"
      :placeholder="$t('mission.metadataForm.namePlaceholder', $store.state.locale)"
      :value="s.title"
      mutation="missionMetadataForm/setTitle"
      :error="titleError"
      :disable-error="!showErrors"
    />
    <Input
      :title="$t('mission.metadataForm.descriptionLabel', $store.state.locale)"
      :placeholder="$t('mission.metadataForm.descriptionPlaceholder', $store.state.locale)"
      :value="s.description"
      mutation="missionMetadataForm/setDescription"
      textarea
    />
    <ButtonText
      :text="$t('mission.metadataForm.submit', $store.state.locale)"
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
