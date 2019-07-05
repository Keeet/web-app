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
import { MISSION_RECRUIT_INSIGHT_LINKS } from '../../constants'
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
    valid() {
      return !this.urlError && !this.titleError
    }
  },
  methods: {
    submit() {
      const missionId = this.mission.id
      const { title, description, url } = this.s
      this.$store.commit('missionInsightsForm/pending')
      this.$push.createMissionInsightLink({
        missionId,
        title,
        description,
        url: url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`,
        linkType: this.getLinkType(url)
      }).then(() => {
        this.$store.commit('missionInsightsForm/submitted')
        this.$store.commit('missionPage/closeInsightForm')
      })
    },
    getLinkType(url) {
      if (url.includes('airtable.com')) {
        return MISSION_RECRUIT_INSIGHT_LINKS.AIR_TABLE
      }
      if (url.includes('google.com')) {
        return MISSION_RECRUIT_INSIGHT_LINKS.GOOGLE_DOCS
      }
      return MISSION_RECRUIT_INSIGHT_LINKS.GENERIC
    }
  }
}
</script>
