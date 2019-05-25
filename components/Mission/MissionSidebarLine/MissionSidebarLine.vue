<template>
  <div class="mission-sidebar-line" :class="{ greyBg }">
    <div class="mission-sidebar-line-icon" :class="type">
      <PersonaIcon v-if="type === TYPES.PERSONA" :icon="value" adjust-size />
      <IconLocation v-if="type === TYPES.LOCATION" />
      <LanguageIcon v-if="type === TYPES.LANGUAGE" :language="value" />
      <IconStopWatch v-if="type === TYPES.DURATION" />
      <IconProfile v-if="type === TYPES.NB_PARTICIPANTS" />
    </div>
    <div class="mission-sidebar-line-text">
      <slot />
    </div>
  </div>
</template>

<script>
import PersonaIcon from '../../_shared/PersonaIcon/PersonaIcon'
import LanguageIcon from '../../_shared/LanguageIcon/LanguageIcon'

const TYPES = {
  PERSONA: 'PERSONA',
  LOCATION: 'LOCATION',
  LANGUAGE: 'LANGUAGE',
  DURATION: 'DURATION',
  NB_PARTICIPANTS: 'NB_PARTICIPANTS'
}

export default {
  name: 'MissionSidebarLine',
  components: { LanguageIcon, PersonaIcon },
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
    greyBg: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { TYPES }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSidebarLine";
</style>
