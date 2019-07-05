<template>
  <div
    :id="id"
    class="mission-survey-results-item-text-line"
    :class="{ maximized, cut, last }"
    @click="maximize"
  >
    <p class="mission-survey-results-item-text-line-text">
      {{ text }}
    </p>
    <div v-show="cut && !maximized" class="mission-survey-results-item-text-line-text-overlay" />
  </div>
</template>

<script>
import uuidv4 from 'uuid'

export default {
  name: 'MissionSurveyResultsItemTextLine',
  props: {
    text: {
      type: String,
      required: true
    },
    last: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: null,
      cut: false,
      maximized: false
    }
  },
  mounted() {
    this.id = uuidv4()
    this.$nextTick(function () {
      window.addEventListener('resize', this.onResize)
      this.onResize()
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      const root = document.getElementById(this.id)
      const text = root.querySelector('.mission-survey-results-item-text-line-text')
      this.cut = root.clientHeight < text.offsetHeight
    },
    maximize() {
      if (!this.cut) {
        return
      }
      this.maximized = true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyResultsItemTextLine";
</style>
