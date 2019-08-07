<template>
  <div class="mission-create-survey-custom-screen-color">
    <div class="mission-create-survey-custom-screen-color-head">
      <p class="mission-create-survey-custom-screen-color-head-text">
        Accent Color
      </p>
      <div
        class="mission-create-survey-custom-screen-color-head-selected"
        :style="{ backgroundColor: s.color.hex }"
        @click="openColorPicker"
      />
    </div>
    <div
      v-show="colorPickerOpened"
      v-closable="{
        excludeClasses: [
          'mission-create-survey-custom-screen-color-head-selected',
          'mission-create-survey-custom-screen-color-picker'
        ],
        handler: 'closeColorPicker'
      }"
      class="mission-create-survey-custom-screen-color-picker"
    >
      <ColorPicker
        :value="s.color"
        mutation="missionFormSurvey/setColor"
        no-transparency
      />
    </div>
  </div>
</template>

<script>
import ColorPicker from '../../_shared/ColorPicker/ColorPicker'
export default {
  name: 'MissionCreateSurveyCustomScreenColor',
  components: { ColorPicker },
  props: {
    colorPickerOpened: {
      type: Boolean,
      default: false
    },
    openColorPickerMutation: {
      type: String,
      required: true
    },
    closeColorPickerMutation: {
      type: String,
      required: true
    }
  },
  computed: {
    s() {
      return this.$store.state.missionFormSurvey
    }
  },
  methods: {
    openColorPicker() {
      this.$store.commit(this.openColorPickerMutation)
    },
    closeColorPicker() {
      if (this.colorPickerOpened) {
        this.$store.commit(this.closeColorPickerMutation)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyCustomScreenColor";
</style>
