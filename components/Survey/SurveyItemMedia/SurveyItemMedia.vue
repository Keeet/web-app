<template>
  <div :id="id" class="survey-item-media" :class="[frame || '', { blur }]">
    <img
      v-if="[PHONE_PORTRAIT, PHONE_LANDSCAPE].includes(frame)"
      class="survey-item-media-frame"
      :class="{ landscape: frame === PHONE_LANDSCAPE }"
      :src="`/img/${frame === PHONE_PORTRAIT ? 'frame-phone-portrait.png' : 'frame-phone-landscape.png'}`"
      @load="imagesLoaded"
    >
    <img
      v-else-if="[TABLET_PORTRAIT, TABLET_LANDSCAPE].includes(frame)"
      class="survey-item-media-frame"
      :class="{ landscape: frame === TABLET_LANDSCAPE }"
      :src="`/img/${frame === TABLET_PORTRAIT ? 'frame-tablet-portrait.png' : 'frame-tablet-landscape.png'}`"
      @load="imagesLoaded"
    >
    <div
      v-dragscroll
      class="survey-item-media-img-wrapper"
      :class="{ scrollable }"
      @dragscrollstart="dragScrollStart"
      @dragscrollend="dragScrollEnd"
    >
      <div class="survey-item-media-img-inner">
        <img
          class="survey-item-media-img"
          :src="image"
          @load="imagesLoaded"
          @click="clickImage"
        >
      </div>
      <div v-show="scrollable && scrollPosition === 0" class="survey-item-media-img-scrolling">
        <img src="../../../assets/img/scrollIconAnimation.gif">
      </div>
    </div>
    <div
      v-if="$slots.overlay && calculatedOverlayCoordinates"
      v-show="!overlayOverflow"
      class="survey-item-media-overlay"
      :style="{ left: `${calculatedOverlayCoordinates.x}px`, top: `${calculatedOverlayCoordinates.y}px` }"
    >
      <slot name="overlay" />
    </div>
  </div>
</template>

<script>
import uuidv4 from 'uuid'
import { MISSION_SURVEY_USABILITY_LAB_ITEM_DEVICE_FRAMES } from '../../constants'
import { offsetLeft, offsetTop } from '../../../utils/scrollUtils'

export default {
  name: 'SurveyItemMedia',
  props: {
    image: {
      type: String,
      required: true
    },
    frame: {
      type: String,
      default: null,
      validator: value => Object.values(MISSION_SURVEY_USABILITY_LAB_ITEM_DEVICE_FRAMES).includes(value)
    },
    overlayCoordinates: {
      type: Object,
      default: null
    },
    blur: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: uuidv4(),
      root: null,
      scrollable: false,
      scrollPosition: 0,
      calculatedOverlayCoordinates: null,
      overlayOverflow: false,
      onDrag: false,
      ...MISSION_SURVEY_USABILITY_LAB_ITEM_DEVICE_FRAMES
    }
  },
  watch: {
    overlayCoordinates() {
      this.calculateOverlayCoordinates()
    }
  },
  mounted() {
    this.root = document.getElementById(this.id)
    window.addEventListener('resize', this.onResize)
    window.addEventListener('scroll', this.calculateOverlayCoordinates)
    this.getScrollableFrame().addEventListener('scroll', this.onFrameScroll)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('scroll', this.calculateOverlayCoordinates)
    this.getScrollableFrame().removeEventListener('scroll', this.onFrameScroll)
  },
  methods: {
    imagesLoaded() {
      this.onResize()
      this.onFrameScroll()
      this.calculateOverlayCoordinates()
    },
    onResize() {
      const frameWrapper = this.root.querySelector('.survey-item-media-img-wrapper')
      const image = frameWrapper.querySelector('.survey-item-media-img')
      const isScrollable = frameWrapper.offsetHeight < image.offsetHeight && frameWrapper.offsetHeight

      if (isScrollable && !this.scrollable) {
        this.scrollable = true
      } else if (!isScrollable && this.scrollable) {
        this.scrollable = false
      }
      this.calculateOverlayCoordinates()
    },
    getScrollableFrame() {
      return this.root.querySelector('.survey-item-media-img-wrapper')
    },
    onFrameScroll() {
      this.scrollPosition = this.getScrollableFrame().scrollTop
      this.calculateOverlayCoordinates()
    },
    clickImage(event) {
      const image = this.getScrollableFrame().querySelector('.survey-item-media-img')
      const x = (event.pageX - offsetLeft(image)) / image.offsetWidth
      const y = (event.pageY - offsetTop(image) + this.scrollPosition) / image.offsetHeight
      if (!this.onDrag && !this.blur) {
        this.$emit('click', { x, y })
      }
    },
    dragScrollStart() {
      this.onDrag = true
    },
    dragScrollEnd() {
      window.setTimeout(() => {
        this.onDrag = false
      }, 100)
    },
    calculateOverlayCoordinates() {
      if (!this.overlayCoordinates) {
        this.calculatedOverlayCoordinates = null
        return
      }
      const imageWrapper = this.getScrollableFrame()
      const image = this.getScrollableFrame().querySelector('.survey-item-media-img')
      const x = offsetLeft(image) + (this.overlayCoordinates.x * image.offsetWidth)
      const y = offsetTop(image) + (this.overlayCoordinates.y * image.offsetHeight) - imageWrapper.scrollTop - window.scrollY
      this.calculatedOverlayCoordinates = { x, y }
      this.overlayOverflow = (y < offsetTop(image) - window.scrollY) || (y > offsetTop(image) + imageWrapper.offsetHeight - window.scrollY)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SurveyItemMedia";
</style>
