<template>
  <div class="mission-create-survey-custom-screen">
    <MissionCreateBox>
      <div class="mission-create-survey-custom-screen-head">
        <div class="mission-create-survey-custom-screen-head-icon">
          <IconPencil />
        </div>
        <div class="mission-create-survey-custom-screen-head-text">
          <p class="mission-create-survey-custom-screen-head-text-headline">
            Default Welcome Screen
          </p>
          <p class="mission-create-survey-custom-screen-head-text-subheadline">
            The first thing your audience will see - a great opportunity
            to engage right away.
          </p>
        </div>
        <div class="mission-create-survey-custom-screen-head-switch">
          <SwitchButton :on="true" mutation="1" />
        </div>
      </div>
    </MissionCreateBox>
  </div>
</template>

<script>
import MissionCreateBox from '../MissionCreateBox/MissionCreateBox'
import SwitchButton from '../../_shared/SwitchButton/SwitchButton'
export default {
  name: 'MissionCreateSurveyCustomScreen',
  components: { SwitchButton, MissionCreateBox }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyCustomScreen";
</style>
