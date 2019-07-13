<template>
  <div class="mission-persona-criteria-item" :class="{opened, last}">
    <div class="mission-persona-criteria-item-head">
      <p class="mission-persona-criteria-item-head-text" @click="!opened ? commitSwitch() : () => {}">
        {{ headline }}
      </p>
      <SwitchButton :on="opened" @switch="commitSwitch" />
    </div>
    <div v-show="opened" class="mission-persona-criteria-item-body">
      <div v-if="type === SLIDER" class="mission-persona-criteria-item-slider">
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
      <MissionPersonaCriteriaItemChecklist
        v-else-if="type === CHECKLIST"
        :values="checklistValues"
        :labels="checklistLabels"
        :value="value"
        :mutation="mutation"
      />
      <MissionPersonaCriteriaItemLanguage
        v-else-if="type === LANGUAGE"
      />
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import SwitchButton from '../../_shared/SwitchButton/SwitchButton'
import MissionPersonaCriteriaItemLanguage
  from '../MissionPersonaCriteriaItemLanguage/MissionPersonaCriteriaItemLanguage'
import MissionPersonaCriteriaItemChecklist
  from '../MissionPersonaCriteriaItemChecklist/MissionPersonaCriteriaItemChecklist'

const TYPES = {
  SLIDER: 'SLIDER',
  CHECKLIST: 'CHECKLIST',
  LANGUAGE: 'LANGUAGE'
}

export default {
  name: 'MissionPersonaCriteriaItem',
  components: { MissionPersonaCriteriaItemChecklist, MissionPersonaCriteriaItemLanguage, SwitchButton, VueSlider },
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
      default: null
    },
    mutation: {
      type: String,
      default: null
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
    },
    last: {
      type: Boolean,
      default: false
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
  @import "MissionPersonaCriteriaItem";
</style>
