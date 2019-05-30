<template>
  <div class="project">
    <ProjectSidebar />
    <OverlayModal
      v-if="projectForm.overlayOpened"
      title="Edit Project"
      :loading="projectForm.pending"
      @close="$store.commit('projectForm/setOverlayOpened', false)"
    >
      <ProjectForm />
    </OverlayModal>
    <div class="project-missions">
      <ProjectMissionsEmpty v-if="!hasMissions" />
      <div v-if="!isSample && $hasAnyRole(['ADMIN', 'USER'])" class="project-missions-create">
        <ButtonCircle type="CREATE" @click="createMission" />
        <IconStartHereMission v-if="!hasMissions" />
      </div>
      <div v-if="hasMissions" class="project-missions-timeline">
        <div
          v-for="(missionGroup, x) in missionsGroupedPerMonth"
          :key="x"
          class="project-missions-timeline-month"
        >
          <div
            class="project-missions-timeline-month-label"
            data-aos="fade-up"
            data-aos-duration="800"
            :data-aos-delay="(missionGroup.missions[0].index + x) * 200"
            data-aos-once="true"
            data-aos-anchor=".project-missions-timeline"
          >
            {{ missionGroup.month }}
          </div>
          <ProjectMission
            v-for="(mission, y) in missionGroup.missions"
            :key="y"
            :mission="mission"
            data-aos="fade-up"
            data-aos-duration="800"
            :data-aos-delay="(mission.index + x + 1) * 200"
            data-aos-once="true"
            data-aos-anchor=".project-missions-timeline"
          />
        </div>
        <div
          class="project-missions-timeline-line"
          data-aos="fade-in"
          data-aos-duration="800"
          :data-aos-delay="1000"
          data-aos-once="true"
          data-aos-anchor=".project-missions-timeline"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getMonthName } from '../../utils/dateUtils'
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
import OverlayModal from '../_shared/OverlayModal/OverlayModal'
import ProjectSidebar from './ProjectSidebar/ProjectSidebar'
import ProjectMissionsEmpty from './ProjectMissionsEmpty/ProjectMissionsEmpty'
import ProjectMission from './ProjectMission/ProjectMission'
import ProjectForm from './ProjectForm/ProjectForm'
export default {
  name: 'Project',
  components: { ProjectForm, OverlayModal, ProjectMission, ProjectMissionsEmpty, ButtonCircle, ProjectSidebar },
  computed: {
    project() {
      return this.$store.state.project
    },
    isSample() {
      return !this.project.id
    },
    projectForm() {
      return this.$store.state.projectForm
    },
    hasMissions() {
      return this.project.missions && this.project.missions.length
    },
    missionsGroupedPerMonth() {
      if (!this.hasMissions) {
        return []
      }
      const sortedByLatest = this.project.missions.slice()
        .sort((a, b) => new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1)

      const grouped = []
      let currentMonth = null
      let index = 0

      sortedByLatest.forEach((mission) => {
        const d = new Date(mission.createdAt)
        const now = new Date()

        const month = d.getMonth()
        const isCurrentMonth = now.getMonth() === month && now.getFullYear() === d.getFullYear()

        if (currentMonth !== month) {
          grouped.push({
            month: isCurrentMonth ? 'this month' : this.getMonthLabel(d),
            missions: [{ ...mission, index }]
          })
          currentMonth = month
        } else {
          grouped[grouped.length - 1].missions.push({ ...mission, index })
        }
        index++
      })
      return grouped
    }
  },
  methods: {
    getMonthLabel(date) {
      const now = new Date()
      const year = date.getFullYear()
      const currentYear = now.getFullYear()

      return (year === currentYear)
        ? getMonthName(now)
        : `${getMonthName(now)} ${year}`
    },
    createMission() {
      this.$store.commit('missionForm/init', {
        company: this.$store.state.company,
        project: this.project
      })
      this.$router.push('/missions/create')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "Project";
</style>
