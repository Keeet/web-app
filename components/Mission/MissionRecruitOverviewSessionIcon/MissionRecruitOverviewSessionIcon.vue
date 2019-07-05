<template>
  <a
    v-if="!disabled && href"
    class="mission-recruit-overview-session-icon"
    :class="[type, { disabled }]"
    :href="href"
  >
    <IconPhone v-if="type === TYPES.PHONE" />
    <IconEnvelope v-if="type === TYPES.EMAIL" />
  </a>
  <div
    v-else
    class="mission-recruit-overview-session-icon"
    :class="[type, { disabled }]"
  >
    <IconPhone v-if="type === TYPES.PHONE" />
    <IconEnvelope v-if="type === TYPES.EMAIL" />
  </div>
</template>

<script>
const TYPES = {
  PHONE: 'PHONE',
  EMAIL: 'EMAIL'
}
export default {
  name: 'MissionRecruitOverviewSessionIcon',
  props: {
    type: {
      type: String,
      required: true
    },
    href: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
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
  @import "MissionRecruitOverviewSessionIcon";
</style>
