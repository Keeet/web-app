<template>
  <div class="mission-nav">
    <div
      v-for="(item, x) in ITEMS"
      :key="x"
      class="mission-nav-item"
    >
      <nuxt-link :to="item.link.replace('{id}', missionId)">
        <span class="mission-nav-item-label" :class="{active: item.page === activePage}">
          {{ item.label }}
        </span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { MISSION_PAGES } from '../../constants'

const ITEMS = [
  {
    page: MISSION_PAGES.OVERVIEW,
    label: 'Overview',
    link: '/missions/{id}/overview'
  },
  {
    page: MISSION_PAGES.INSIGHTS,
    label: 'Insights',
    link: '/missions/{id}/insights'
  }
]
export default {
  name: 'MissionNav',
  data() {
    return { ITEMS }
  },
  computed: {
    missionId() {
      return this.$store.state.mission.id
    },
    activePage() {
      return this.$store.state.missionPage.activePage
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionNav";
</style>
