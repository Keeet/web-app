<template>
  <div class="mission-create-recruit-summary-icons-item">
    <div class="mission-create-recruit-summary-icons-item-icon">
      <LanguageIcon v-if="type === TYPES.LANGUAGE" :language="value" />
      <IconStopWatch v-if="type === TYPES.DURATION" />
      <IconProfile v-if="type === TYPES.NB_PARTICIPANTS" />
    </div>
    <p class="mission-create-recruit-summary-icons-item-text">
      {{ text }}
    </p>
  </div>
</template>

<script>
import LanguageIcon from '../../_shared/LanguageIcon/LanguageIcon'
const TYPES = {
  LANGUAGE: 'LANGUAGE',
  DURATION: 'DURATION',
  NB_PARTICIPANTS: 'NB_PARTICIPANTS'
}

export default {
  name: 'MissionCreateRecruitSummaryIconsItem',
  components: { LanguageIcon },
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.values(TYPES).includes(value)
    },
    value: {
      type: String,
      default: null
    },
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      TYPES
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitSummaryIconsItem";
</style>
