<template>
  <OverlayModal
    title="Add external document"
    :loading="s.pending"
    @close="$store.commit('missionPage/closeInsightForm')"
  >
    <Input
      title="Url"
      placeholder="https://docs.google.com/document/d/1f3nxVg1h"
      :error="urlError"
      :disable-error="!showErrors"
      :value="s.url"
      mutation="missionInsightsForm/setUrl"
    />
    <Input
      title="Titel"
      placeholder="Interview notes"
      :error="titleError"
      :disable-error="!showErrors"
      :value="s.title"
      mutation="missionInsightsForm/setTitle"
    />
    <Input
      title="Description"
      :value="s.description"
      :error="descriptionError"
      :disable-error="!showErrors"
      mutation="missionInsightsForm/setDescription"
      textarea
    />
    <ButtonText
      text="Add"
      :disabled="!valid"
      @disabledClick="showErrors = true"
      @click="submit"
    />
  </OverlayModal>
</template>

<script>
import OverlayModal from '../../_shared/OverlayModal/OverlayModal'
import Input from '../../_shared/Input/Input'
import ButtonText from '../../_shared/ButtonText/ButtonText'
import { isLink } from '../../../utils/stringUtils'

export default {
  name: 'MissionRecruitInsightsForm',
  components: { ButtonText, Input, OverlayModal },
  data() {
    return { showErrors: false }
  },
  computed: {
    s() {
      return this.$store.state.missionInsightsForm
    },
    mission() {
      return this.$store.state.mission
    },
    urlError() {
      if (this.s.url === '') {
        return 'required'
      }
      if (!isLink(this.s.url)) {
        if (!this.s.url.startsWith('http://') && !this.s.url.startsWith('https://') && isLink(`https://${this.s.url}`)) {
          return null
        }
        return 'invalid url'
      }
      return null
    },
    titleError() { return this.s.title !== '' ? null : 'required' },
    descriptionError() { return this.s.description !== '' ? null : 'required' },
    valid() {
      return !this.urlError && !this.titleError && !this.descriptionError
    }
  },
  methods: {
    submit() {
      this.$store.dispatch('missionInsightsForm/submit').then(() => {
        this.$store.commit('missionPage/closeInsightForm')
      })
    }
  }
}
</script>
