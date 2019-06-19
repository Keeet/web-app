<template>
  <div class="mission-create-side-box" :class="submitBoxPositioning">
    <div class="mission-create-side-box-ref" />
    <div class="mission-create-side-box-inner">
      <div class="mission-create-side-box-box">
        <div class="mission-create-side-box-head">
          <div class="mission-create-side-box-head-icon" :class="type">
            <IconMissionInHouse v-if="type === IN_HOUSE" />
            <IconMissionRemote v-else-if="type === REMOTE" />
            <IconMissionSurvey v-else-if="type === SURVEY" />
            <IconMissionUsabilityLab v-else-if="type === USABILITY_LAB" />
          </div>
          <div class="mission-create-side-box-head-text">
            {{ missionLabel }} Mission
          </div>
        </div>
        <div class="mission-create-side-box-body">
          <slot name="body" />
        </div>
      </div>
      <div v-if="$slots.buttons" class="mission-create-side-box-buttons">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script>
import { MISSIONS, MISSION_LABELS } from '../../constants'
import { determineFixedOrAbsolute } from '../../../utils/scrollUtils'

export default {
  name: 'MissionCreateSideBox',
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.values(MISSIONS).includes(value)
    }
  },
  data() {
    const { IN_HOUSE, REMOTE, USABILITY_LAB, SURVEY } = MISSIONS
    return { IN_HOUSE, REMOTE, USABILITY_LAB, SURVEY, submitBoxPositioning: null }
  },
  computed: {
    missionLabel() {
      return MISSION_LABELS[this.type]
    }
  },
  mounted() {
    this.onScroll()
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      let wrapperClass
      if ([MISSIONS.IN_HOUSE, MISSIONS.REMOTE].includes(this.type)) {
        wrapperClass = 'mission-create-recruit-form'
      }
      if ([MISSIONS.SURVEY, MISSIONS.USABILITY_LAB].includes(this.type)) {
        wrapperClass = 'mission-create-survey'
      }

      const positioning = determineFixedOrAbsolute(
        document.getElementsByClassName('mission-create-side-box-ref')[0],
        document.getElementsByClassName('mission-create-side-box-inner')[0],
        document.getElementsByClassName(wrapperClass)[0]
      )
      if (positioning !== this.submitBoxPositioning) {
        this.submitBoxPositioning = positioning
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSideBox";
</style>
