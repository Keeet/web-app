<template>
  <div class="mission-create-summary">
    <div class="mission-create-summary-body">
      <MissionCreateSubHeadline text="All important stuff in one place:" />
      <MissionCreateBox>
        <MissionCreateSummaryIcons />
      </MissionCreateBox>
      <MissionCreateSubHeadline text="See what time slots you did choose:" />
      <MissionCreateTimeslots />
    </div>
    <div class="mission-create-summary-submit" :class="submitBoxPositioning">
      <div class="mission-create-summary-submit-ref" />
      <div class="mission-create-summary-submit-inner">
        <MissionCreateBox little-padding>
          <MissionCreateSummaryPersona />
          <div class="mission-create-summary-submit-button">
            <ButtonText text="Order Now" @click="$emit('submit')" />
          </div>
        </MissionCreateBox>
      </div>
    </div>
  </div>
</template>

<script>
import MissionCreateSubHeadline from '../MissionCreateSubHeadline/MissionCreateSubHeadline'
import MissionCreateBox from '../MissionCreateBox/MissionCreateBox'
import MissionCreateSummaryIcons from '../MissionCreateSummaryIcons/MissionCreateSummaryIcons'
import MissionCreateTimeslots from '../MissionCreateTimeslots/MissionCreateTimeslots'
import MissionCreateSummaryPersona from '../MissionCreateSummaryPersona/MissionCreateSummaryPersona'
import ButtonText from '../../_shared/ButtonText/ButtonText'
import { determineFixedOrAbsolute } from '../../../utils/scrollUtils'
export default {
  name: 'MissionCreateSummary',
  components: { ButtonText, MissionCreateSummaryPersona, MissionCreateTimeslots, MissionCreateSummaryIcons, MissionCreateBox, MissionCreateSubHeadline },
  data() {
    return {
      submitBoxPositioning: null
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
        document.getElementsByClassName('mission-create-summary-submit-ref')[0],
        document.getElementsByClassName('mission-create-summary-submit-inner')[0],
        document.getElementsByClassName('mission-create-summary')[0],
        -30,
        -30
      )
      if (positioning !== this.submitBoxPositioning) {
        this.submitBoxPositioning = positioning
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSummary";
</style>
