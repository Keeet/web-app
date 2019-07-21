<template>
  <div class="account-team-role" :class="{ active }">
    <div class="account-team-role-head">
      <p class="account-team-role-head-title">
        {{ title }}
      </p>
      <div class="account-team-role-head-icon">
        <IconCheck v-if="active" />
        <IconLoading v-if="loading" />
      </div>
    </div>
    <p class="account-team-role-description">
      {{ description }}
    </p>
  </div>
</template>

<script>
import { ROLES, ROLE_LABELS } from '../../constants'

const ROLE_DESCRIPTIONS = {
  VIEWER: 'Able to view projects and mission.',
  USER: 'Able to create projects and missions.',
  ADMIN: 'Able to invite members and create projects and mission.'
}

export default {
  name: 'AccountTeamRole',
  props: {
    role: {
      type: String,
      required: true,
      validator: value => Object.keys(ROLES).includes(value)
    },
    active: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    title() {
      return ROLE_LABELS[this.role]
    },
    description() {
      return ROLE_DESCRIPTIONS[this.role]
    }
  }
}
</script>

<style scoped lang="scss">
  @import "AccountTeamRole";
</style>
