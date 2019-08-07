<template>
  <div class="mission-create-type-item">
    <div class="mission-create-type-item-icon" :class="type">
      <div class="mission-create-type-item-icon-inner">
        <IconMissionInHouse v-if="type === MISSIONS.IN_HOUSE" />
        <IconMissionRemote v-if="type === MISSIONS.REMOTE" />
        <IconMissionSurvey v-if="type === MISSIONS.SURVEY" />
        <IconMissionUsabilityLab v-if="type === MISSIONS.USABILITY_LAB" />
      </div>
    </div>
    <div class="mission-create-type-item-text">
      <p class="mission-create-type-item-text-title">
        {{ MISSION_LABELS[type] }}
      </p>
      <p class="mission-create-type-item-text-description">
        {{ MISSION_INFO_DESCRIPTION[type] }}
      </p>
      <ul class="mission-create-type-item-text-use-cases">
        <li v-for="(usecase, x) in MISSION_INFO_USE_CASES[type]" :key="x">
          {{ usecase }}
        </li>
      </ul>
      <div class="mission-create-type-item-text-button">
        <ButtonText type="GREY" text="Select" no-margin :bg-color-class="type" />
      </div>
    </div>
  </div>
</template>

<script>
import { MISSIONS, MISSION_LABELS, MISSION_INFO_DESCRIPTION, MISSION_INFO_USE_CASES } from '../../constants'
import ButtonText from '../../_shared/ButtonText/ButtonText'

export default {
  name: 'MissionCreateTypeItem',
  components: { ButtonText },
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.keys(MISSIONS).includes(value)
    }
  },
  data() {
    return { MISSIONS, MISSION_LABELS, MISSION_INFO_DESCRIPTION, MISSION_INFO_USE_CASES }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateTypeItem";
</style>
