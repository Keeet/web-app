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
            data-aos="fade-up"
            data-aos-duration="700"
            :data-aos-delay="(missionGroup.missions[0].index + x) * 100"
            data-aos-once="true"
            data-aos-anchor="body"
          >
            <div class="project-missions-timeline-month-label">
              {{ missionGroup.month }}
            </div>
          </div>
          <ProjectMission
            v-for="(mission, y) in missionGroup.missions"
            :key="y"
            :mission="mission"
            :aos-delay="(mission.index + x + 1) * 100"
          />
        </div>
        <div class="project-missions-timeline-line">
          <div
            class="project-missions-timeline-line-content"
            data-aos="fade-in"
            data-aos-duration="800"
            :data-aos-delay="1000"
            data-aos-once="true"
            data-aos-anchor="body"
          />
        </div>
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
  mounted() {
    this.$ga.page(this.$router)
  },
  methods: {
    getMonthLabel(date) {
      const now = new Date()
      const year = date.getFullYear()
      const currentYear = now.getFullYear()

      return (year === currentYear)
        ? getMonthName(date)
        : `${getMonthName(date)} ${year}`
    },
    createMission() {
      this.$store.dispatch('missionForm/initProjectMission', { project: this.project })
      this.$router.push('/missions/create')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "Project";
</style>
