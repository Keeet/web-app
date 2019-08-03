<template>
  <div :id="id" class="survey-item-media" :class="[frame || '', { blur }]">
    <img
      v-if="[PHONE_PORTRAIT, PHONE_LANDSCAPE].includes(frame)"
      class="survey-item-media-frame"
      :class="{ landscape: frame === PHONE_LANDSCAPE }"
      :src="`/img/${frame === PHONE_PORTRAIT ? 'frame-phone-portrait.png' : 'frame-phone-landscape.png'}`"
      @load="frameLoaded = true"
    >
    <img
      v-else-if="[TABLET_PORTRAIT, TABLET_LANDSCAPE].includes(frame)"
      class="survey-item-media-frame"
      :class="{ landscape: frame === TABLET_LANDSCAPE }"
      :src="`/img/${frame === TABLET_PORTRAIT ? 'frame-tablet-portrait.png' : 'frame-tablet-landscape.png'}`"
      @load="frameLoaded = true"
    >
    <div
      class="survey-item-media-img-scroll"
      :class="{ scrollable }"
    >
      <div class="survey-item-media-img-scroll-content">
        <div class="survey-item-media-img-scroll-content-inner">
          <ThumborImage
            :src="image"
            :width="imageWidth"
            @load="imageLoaded = true"
            @click.native="clickImage"
          />
          <div
            v-if="heatmapPoints"
            class="survey-item-media-heatmap-wrapper"
            :class="{ active: heatmapEnabled }"
          >
            <div class="survey-item-media-heatmap" />
          </div>
        </div>
      </div>
      <div v-show="scrollable && scrollPosition === 0 && !scrolledAlready" class="survey-item-media-img-scrolling">
        <IconArrowDown />
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
import ThumborImage from '../../_shared/ThumborImage/ThumborImage'

const IMAGE_SELECTOR = '.survey-item-media-img-scroll-content-inner .thumbor-image'

export default {
  name: 'SurveyItemMedia',
  components: { ThumborImage },
  props: {
    image: {
      type: String,
      required: true
    },
    frame: {
      type: String,
      default: null,
      validator: value => Object.keys(MISSION_SURVEY_USABILITY_LAB_ITEM_DEVICE_FRAMES).includes(value)
    },
    overlayCoordinates: {
      type: Object,
      default: null
    },
    blur: {
      type: Boolean,
      default: false
    },
    heatmapPoints: {
      type: Array,
      default: null
    },
    heatmapEnabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      id: null,
      frameLoaded: false,
      imageLoaded: false,
      root: null,
      scrollable: false,
      scrollPosition: 0,
      scrolledAlready: false,
      calculatedOverlayCoordinates: null,
      overlayOverflow: false,
      heatmap: null,
      heatmapContainer: null,
      ...MISSION_SURVEY_USABILITY_LAB_ITEM_DEVICE_FRAMES
    }
  },
  computed: {
    imagesLoaded() {
      const noFrame = this.frame === MISSION_SURVEY_USABILITY_LAB_ITEM_DEVICE_FRAMES.NO_FRAME
      return (this.frameLoaded || noFrame) && this.imageLoaded
    },
    imageWidth() {
      const {
        PHONE_PORTRAIT,
        PHONE_LANDSCAPE,
        TABLET_PORTRAIT,
        TABLET_LANDSCAPE
      } = MISSION_SURVEY_USABILITY_LAB_ITEM_DEVICE_FRAMES

      switch (this.frame) {
        case PHONE_PORTRAIT:
          return 400
        case PHONE_LANDSCAPE:
          return 800
        case TABLET_PORTRAIT:
          return 600
        case TABLET_LANDSCAPE:
          return 1000
        default:
          return 1400
      }
    }
  },
  watch: {
    overlayCoordinates() {
      this.calculateOverlayCoordinates()
    },
    imagesLoaded() {
      this.onResize()
      this.onFrameScroll(true)
      this.calculateOverlayCoordinates()
      this.$emit('imageLoad')

      if (this.heatmapPoints) {
        this.heatmapContainer = this.root.querySelector('.survey-item-media-heatmap')
        this.renderHeatmap()
      }
    }
  },
  mounted() {
    this.id = uuidv4()
    this.$nextTick(function () {
      this.root = document.getElementById(this.id)
      window.addEventListener('resize', this.onResize)
      window.addEventListener('scroll', this.calculateOverlayCoordinates)
      this.getScrollableFrame().addEventListener('scroll', this.onFrameScroll)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('scroll', this.calculateOverlayCoordinates)
    this.getScrollableFrame().removeEventListener('scroll', this.onFrameScroll)
  },
  methods: {
    onResize() {
      const frameWrapper = this.root.querySelector('.survey-item-media-img-scroll')
      const image = frameWrapper.querySelector(IMAGE_SELECTOR)
      const isScrollable = frameWrapper.offsetHeight < image.offsetHeight && frameWrapper.offsetHeight

      if (isScrollable && !this.scrollable) {
        this.scrollable = true
      } else if (!isScrollable && this.scrollable) {
        this.scrollable = false
      }
      this.calculateOverlayCoordinates()
      if (this.heatmap) {
        this.resizeHeatmap()
      }
    },
    getScrollableFrame() {
      return this.root.querySelector('.survey-item-media-img-scroll')
    },
    onFrameScroll(init = false) {
      if (init !== true && !this.scrolledAlready) {
        this.scrolledAlready = true
      }
      this.scrollPosition = this.getScrollableFrame().scrollTop
      this.calculateOverlayCoordinates()
    },
    clickImage(event) {
      const image = this.getScrollableFrame().querySelector(IMAGE_SELECTOR)
      const x = (event.pageX - offsetLeft(image)) / image.offsetWidth
      const y = (event.pageY - offsetTop(image) + this.scrollPosition) / image.offsetHeight
      if (!this.blur) {
        this.$emit('click', { x, y })
      }
    },
    calculateOverlayCoordinates() {
      if (!this.overlayCoordinates) {
        this.calculatedOverlayCoordinates = null
        return
      }
      const imageWrapper = this.getScrollableFrame()
      const image = this.getScrollableFrame().querySelector(IMAGE_SELECTOR)
      const x = offsetLeft(image) + (this.overlayCoordinates.x * image.offsetWidth)
      const y = offsetTop(image) + (this.overlayCoordinates.y * image.offsetHeight) - imageWrapper.scrollTop - window.scrollY
      this.calculatedOverlayCoordinates = { x, y }
      this.overlayOverflow = (y < offsetTop(image) - window.scrollY) || (y > offsetTop(image) + imageWrapper.offsetHeight - window.scrollY)
    },
    renderHeatmap() {
      this.$loadHeatmap
        .then(() => {
          // eslint-disable-next-line no-undef
          this.heatmap = h337.create({
            container: this.heatmapContainer,
            radius: 20
          })
          this.resizeHeatmap()
        })
        // eslint-disable-next-line no-console
        .catch(console.error)
    },
    resizeHeatmap() {
      this.heatmap.setData({
        max: 2,
        min: 0,
        data: this.heatmapPoints.map(({ x, y }) => ({
          x: Math.round(this.heatmapContainer.offsetWidth * x),
          y: Math.round(this.heatmapContainer.offsetHeight * y),
          value: 1
        }))
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SurveyItemMedia";
</style>
