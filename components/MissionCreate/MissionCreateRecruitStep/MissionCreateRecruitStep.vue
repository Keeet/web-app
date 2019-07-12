<template>
  <div class="mission-create-recruit-step">
    <FormStep
      next-step-mutation="missionForm/nextStep"
      prev-step-mutation="missionForm/previousStep"
      :active="s.activeStep === index"
      :valid="s.invalidFields.length === 0"
      @invalidNext="invalidNextClick"
    >
      <div class="mission-create-recruit-step-head">
        <MissionCreateHeadline :text="`${index} / 4 ${MISSION_LABELS[s.type]} Mission`" />
        <MissionCreateSubHeadline v-if="subheadline" :text="subheadline" />
      </div>
      <div class="mission-create-recruit-step-body">
        <div class="mission-create-recruit-step-body-content">
          <slot />
        </div>
        <MissionSideBox :type="s.type" wrapper-class="mission-create-recruit-step-body">
          <template slot="body">
            You have in total 3 more testers free for this month.
          </template>
        </MissionSideBox>
      </div>
    </FormStep>
  </div>
</template>

<script>
import MissionSideBox from '../../_shared/MissionSideBox/MissionSideBox'
import FormStep from '../../_shared/FormStep/FormStep'
import { scrollToTopId } from '../../../utils/scrollUtils'
import MissionCreateHeadline from '../MissionCreateHeadline/MissionCreateHeadline'
import { MISSION_LABELS } from '../../constants'
import MissionCreateSubHeadline from '../MissionCreateSubHeadline/MissionCreateSubHeadline'

export default {
  name: 'MissionCreateRecruitStep',
  components: { MissionCreateSubHeadline, MissionCreateHeadline, FormStep, MissionSideBox },
  props: {
    index: {
      type: Number,
      required: true
    },
    subheadline: {
      type: String,
      default: null
    },
    last: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { MISSION_LABELS }
  },
  computed: {
    s() {
      const { missionForm, missionFormRecruit } = this.$store.state
      return {
        ...missionForm,
        recruit: missionFormRecruit
      }
    }
  },
  methods: {
    invalidNextClick() {
      if (!this.s.showErrors) {
        this.$store.commit('missionForm/showErrors')
      }
      scrollToTopId(this.s.invalidFields.map(field => field.id))
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitStep";
</style>
