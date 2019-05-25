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
    <div class="mission-create-summary-submit">
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
export default {
  name: 'MissionCreateSummary',
  components: { ButtonText, MissionCreateSummaryPersona, MissionCreateTimeslots, MissionCreateSummaryIcons, MissionCreateBox, MissionCreateSubHeadline }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSummary";
</style>
