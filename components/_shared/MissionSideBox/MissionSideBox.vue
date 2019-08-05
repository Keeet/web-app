<template>
  <div class="mission-side-box" :class="submitBoxPositioning">
    <div class="mission-side-box-ref" />
    <div class="mission-side-box-inner">
      <div class="mission-side-box-box">
        <div class="mission-side-box-head">
          <div class="mission-side-box-head-icon" :class="type">
            <IconMissionInHouse v-if="type === IN_HOUSE" />
            <IconMissionRemote v-else-if="type === REMOTE" />
            <IconMissionSurvey v-else-if="type === SURVEY" />
            <IconMissionUsabilityLab v-else-if="type === USABILITY_LAB" />
          </div>
          <div class="mission-side-box-head-text">
            {{ $t('shared.missionSideBox.headline', $store.state.locale, { missionLabel }) }}
          </div>
        </div>
        <div class="mission-side-box-body">
          <slot name="body" />
        </div>
      </div>
      <div v-if="$slots.buttons" class="mission-side-box-buttons">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script>
import { MISSIONS, MISSION_LABELS } from '../../constants'
import { determineFixedOrAbsolute } from '../../../utils/scrollUtils'

export default {
  name: 'MissionSideBox',
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.keys(MISSIONS).includes(value)
    },
    wrapperClass: {
      type: String,
      required: true
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
      const positioning = determineFixedOrAbsolute(
        document.getElementsByClassName('mission-side-box-ref')[0],
        document.getElementsByClassName('mission-side-box-inner')[0],
        document.getElementsByClassName(this.wrapperClass)[0]
      )
      if (positioning !== this.submitBoxPositioning) {
        this.submitBoxPositioning = positioning
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSideBox";
</style>
