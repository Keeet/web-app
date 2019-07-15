<template>
  <div class="survey-item-preference-test">
    <div v-if="!response.started" class="survey-item-preference-test-button">
      <ButtonText
        text="Click to view images"
        :bg-color="s.color"
        @click="$store.commit('surveyForm/startUsabilityTest')"
      />
    </div>
    <div class="survey-item-preference-test-content" :class="{ blur: !response.started }">
      <div v-show="!response.sliderActive" class="survey-item-preference-test-gallery">
        <div
          v-for="(image, x) in item.images"
          :key="x"
          class="survey-item-preference-test-gallery-item"
          :class="`count${item.images.length}`"
          @click="selectGalleryItem(x)"
        >
          <img :src="image.url">
        </div>
      </div>
      <div v-show="response.sliderActive" class="survey-item-preference-test-slider">
        <div class="survey-item-preference-test-slider-body">
          <carousel
            :per-page="1"
            :min-swipe-distance="50"
            :navigate-to="activeSliderItem"
            :pagination-active-color="s.color"
            @page-change="carouselChange"
          >
            <slide
              v-for="(image, x) in item.images"
              :key="x"
              @slide-click="setSliderActive(false)"
            >
              <div class="survey-item-preference-test-slider-item">
                <div class="survey-item-preference-test-slider-item-inner">
                  <img :src="image.url">
                </div>
              </div>
            </slide>
          </carousel>
        </div>
        <div class="survey-item-preference-test-slider-footer">
          <div class="survey-item-preference-test-slider-footer-buttons">
            <div
              class="survey-item-preference-test-slider-footer-buttons-nav"
              :class="{ active: hasPrev }"
              @click="prevSlide"
            >
              <IconAngleLeft />
            </div>
            <div class="survey-item-preference-test-slider-footer-buttons-select">
              <ButtonText
                text="Choose this one"
                no-margin
                :bg-color="s.color"
                @click="selectImage"
              />
            </div>
            <div
              class="survey-item-preference-test-slider-footer-buttons-nav"
              :class="{ active: hasNext }"
              @click="nextSlide"
            >
              <IconAngleRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonText from '../../_shared/ButtonText/ButtonText'
export default {
  name: 'SurveyItemPreferenceTest',
  components: { ButtonText },
  data() {
    return {
      activeSliderItem: 0
    }
  },
  computed: {
    s() {
      return this.$store.state.survey
    },
    item() {
      return this.$store.getters['surveyForm/activeItem']
    },
    response() {
      return this.$store.getters['surveyForm/activeResponse']
    },
    activeSliderItemIndex() {
      return Array.isArray(this.activeSliderItem) ? this.activeSliderItem[0] : this.activeSliderItem
    },
    activeSliderItemImage() {
      return this.item.images[this.activeSliderItemIndex]
    },
    hasNext() {
      return this.activeSliderItemIndex < this.item.images.length - 1
    },
    hasPrev() {
      return this.activeSliderItemIndex > 0
    }
  },
  methods: {
    selectGalleryItem(index) {
      if (this.response.started) {
        this.setSliderActive(true)
        this.activeSliderItem = [index, false]
      }
    },
    setSliderActive(sliderActive) {
      this.$store.commit('surveyForm/setPreferenceTestSliderActive', sliderActive)
    },
    carouselChange(index) {
      this.activeSliderItem = index
    },
    nextSlide() {
      if (this.hasNext) {
        this.activeSliderItem = this.activeSliderItemIndex + 1
      }
    },
    prevSlide() {
      if (this.hasPrev) {
        this.activeSliderItem = this.activeSliderItemIndex - 1
      }
    },
    selectImage() {
      this.$store.commit('surveyForm/setPreferenceTestSelectedImageId', this.activeSliderItemImage.id)
      this.$store.dispatch('surveyForm/nextStep')
    }
  }
}
</script>

<style lang="scss">
  @import "SurveyItemPreferenceTest";
</style>
