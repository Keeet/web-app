<template>
  <div class="project">
    <div class="project-sidebar">
      <ProjectSidebar />
    </div>
    <div class="project-missions">
      <ProjectMissionsEmpty v-if="hasMissions" />
      <div class="project-missions-create">
        <nuxt-link to="/missions/create">
          <ButtonCircle type="CREATE" />
        </nuxt-link>
        <IconStartHereMission v-if="hasMissions" />
      </div>
      <div class="project-missions-timeline">
        <div
          v-for="(missionGroup, x) in missionsGroupedPerMonth"
          :key="x"
          class="project-missions-timeline-month"
        >
          <div class="project-missions-timeline-month-label">
            {{ missionGroup.month }}
          </div>
          <ProjectMission
            v-for="(mission, y) in missionGroup.missions"
            :key="y"
            :mission="mission"
          />
        </div>
        <div class="project-missions-timeline-line" />
      </div>
    </div>
  </div>
</template>

<script>
import { getMonthName } from '../../utils/dateUtils'
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
import ProjectSidebar from './ProjectSidebar/ProjectSidebar'
import ProjectMissionsEmpty from './ProjectMissionsEmpty/ProjectMissionsEmpty'
import ProjectMission from './ProjectMission/ProjectMission'
export default {
  name: 'Project',
  components: { ProjectMission, ProjectMissionsEmpty, ButtonCircle, ProjectSidebar },
  computed: {
    project() {
      return this.$store.state.project
    },
    hasMissions() {
      return !this.project.missions || !this.project.missions.length
    },
    missionsGroupedPerMonth() {
      const sortedByLatest = this.project.missions.slice()
        .sort((a, b) => new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1)

      const grouped = []
      let currentMonth = null

      sortedByLatest.forEach((mission) => {
        const d = new Date(mission.createdAt)
        const now = new Date()

        const month = d.getMonth()
        const isCurrentMonth = now.getMonth() === month && now.getFullYear() === d.getFullYear()

        if (currentMonth !== month) {
          grouped.push({
            month: isCurrentMonth ? 'this month' : this.getMonthLabel(d),
            missions: [mission]
          })
          currentMonth = month
        } else {
          grouped[grouped.length - 1].missions.push(mission)
        }
      })
      return grouped
    }
  },
  methods: {
    getMonthLabel(date) {
      const now = new Date()
      const month = date.getMonth()
      const year = date.getFullYear()
      const currentYear = now.getFullYear()

      return (year === currentYear)
        ? getMonthName(month)
        : `${getMonthName(month)} ${year}`
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "Project";
</style>
