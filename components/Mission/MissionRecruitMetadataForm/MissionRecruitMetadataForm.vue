<template>
  <div class="mission-recruit-metadata-form">
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
    <ButtonText text="Update" :disabled="!formValid" @click="submit" @disabledClick="showErrors = true" />
  </div>
</template>

<script>
import Input from '../../_shared/Input/Input'
import ButtonText from '../../_shared/ButtonText/ButtonText'

export default {
  name: 'MissionRecruitMetadataForm',
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
  },
  methods: {
    submit() {
      this.$store.commit('missionMetadataForm/pending')
      this.$push.updateMission(this.s).then(() => {
        this.$store.commit('missionMetadataForm/submitted')
        this.$store.commit('missionMetadataForm/setOverlayOpened', false)
      })
    }
  }
}
</script>
