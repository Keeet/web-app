<template>
  <div class="mission-persona-criteria" :class="{opened}">
    <div class="mission-persona-criteria-head">
      <p class="mission-persona-criteria-head-text" @click="!opened ? commitSwitch() : () => {}">
        {{ headline }}
      </p>
      <SwitchButton :on="opened" @switch="commitSwitch" />
    </div>
    <div v-show="opened" class="mission-persona-criteria-body">
      <div v-if="type === SLIDER" class="mission-persona-criteria-slider">
        <vue-slider
          v-model="sliderVModel"
          :min="sliderRange[0]"
          :max="sliderRange[1]"
          :enable-cross="false"
          :min-range="sliderMinRange"
          :dot-size="20"
          tooltip="always"
          :lazy="true"
          :contained="true"
        />
      </div>
      <MissionPersonaCriteriaChecklist
        v-else-if="type === CHECKLIST"
        :values="checklistValues"
        :labels="checklistLabels"
        :value="value"
        :mutation="mutation"
      />
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import SwitchButton from '../../_shared/SwitchButton/SwitchButton'
import MissionPersonaCriteriaChecklist from '../MissionPersonaCriteriaChecklist/MissionPersonaCriteriaChecklist'

const TYPES = {
  SLIDER: 'SLIDER',
  CHECKLIST: 'CHECKLIST'
}

export default {
  name: 'MissionPersonaCriteria',
  components: { MissionPersonaCriteriaChecklist, SwitchButton, VueSlider },
  props: {
    headline: {
      type: String,
      required: true
    },
    type: {
      type: String,
      validator: value => Object.values(TYPES).includes(value),
      required: true
    },
    value: {
      type: [Array, String],
      required: true
    },
    mutation: {
      type: String,
      required: true
    },
    opened: {
      type: Boolean,
      required: true
    },
    switchMutation: {
      type: String,
      required: true
    },
    sliderRange: {
      type: Array,
      default: () => [0, 10]
    },
    sliderMinRange: {
      type: Number,
      default: 3
    },
    checklistValues: {
      type: Array,
      default: null
    },
    checklistLabels: {
      type: Object,
      default: null
    }
  },
  data() {
    return { ...TYPES }
  },
  computed: {
    sliderVModel: {
      get() {
        if (this.value[0] && this.value[1]) {
          return this.value
        } else {
          return this.sliderRange
        }
      },
      set(value) {
        this.$store.commit(this.mutation, value)
      }
    }
  },
  methods: {
    commitSwitch() {
      this.$store.commit(this.switchMutation)
    }
  }
}
</script>

<style lang="scss">
  @import "../../../assets/style/slider";
</style>

<style scoped lang="scss">
  @import "MissionPersonaCriteria";
</style>
