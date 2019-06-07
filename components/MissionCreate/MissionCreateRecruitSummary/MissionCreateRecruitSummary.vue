<template>
  <div class="mission-create-recruit-summary">
    <div class="mission-create-recruit-summary-body">
      <MissionCreateSubHeadline text="All important stuff in one place:" />
      <MissionCreateBox>
        <MissionCreateRecruitSummaryIcons />
      </MissionCreateBox>
      <MissionCreateSubHeadline text="See what time slots you did choose:" />
      <MissionCreateTimeslots />
    </div>
    <div class="mission-create-recruit-summary-submit" :class="submitBoxPositioning">
      <div class="mission-create-recruit-summary-submit-ref" />
      <div class="mission-create-recruit-summary-submit-inner">
        <MissionCreateBox little-padding>
          <MissionCreateRecruitSummaryPersona />
          <div class="mission-create-recruit-summary-submit-button">
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
import MissionCreateRecruitSummaryIcons from '../MissionCreateRecruitSummaryIcons/MissionCreateRecruitSummaryIcons'
import MissionCreateTimeslots from '../MissionCreateTimeslots/MissionCreateTimeslots'
import MissionCreateRecruitSummaryPersona from '../MissionCreateRecruitSummaryPersona/MissionCreateRecruitSummaryPersona'
import ButtonText from '../../_shared/ButtonText/ButtonText'
import { determineFixedOrAbsolute } from '../../../utils/scrollUtils'
export default {
  name: 'MissionCreateRecruitSummary',
  components: { ButtonText, MissionCreateRecruitSummaryPersona, MissionCreateTimeslots, MissionCreateRecruitSummaryIcons, MissionCreateBox, MissionCreateSubHeadline },
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
        document.getElementsByClassName('mission-create-recruit-summary-submit-ref')[0],
        document.getElementsByClassName('mission-create-recruit-summary-submit-inner')[0],
        document.getElementsByClassName('mission-create-recruit-summary')[0],
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
  @import "MissionCreateRecruitSummary";
</style>
