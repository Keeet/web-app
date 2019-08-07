<template>
  <OverlayModal
    :title="$t('mission.recruit.insights.form.title', $store.state.locale)"
    :loading="s.pending"
    @close="$store.commit('missionPage/closeInsightForm')"
  >
    <Input
      :title="$t('mission.recruit.insights.form.urlLabel', $store.state.locale)"
      :placeholder="$t('mission.recruit.insights.form.urlPlaceholder', $store.state.locale)"
      :error="urlError"
      :disable-error="!showErrors"
      :value="s.url"
      mutation="missionInsightsForm/setUrl"
    />
    <Input
      :title="$t('mission.recruit.insights.form.titleLabel', $store.state.locale)"
      :placeholder="$t('mission.recruit.insights.form.titlePlaceholder', $store.state.locale)"
      :error="titleError"
      :disable-error="!showErrors"
      :value="s.title"
      mutation="missionInsightsForm/setTitle"
    />
    <Input
      :title="$t('mission.recruit.insights.form.descriptionLabel', $store.state.locale)"
      :value="s.description"
      :error="descriptionError"
      :disable-error="!showErrors"
      mutation="missionInsightsForm/setDescription"
      textarea
    />
    <ButtonText
      :text="$t('mission.recruit.insights.form.submit', $store.state.locale)"
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
