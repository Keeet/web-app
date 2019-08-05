<template>
  <div class="error-wrapper">
    <div class="error">
      <div class="error-body">
        <div v-if="error.statusCode === 404" class="error-body-404">
          <div
            class="error-body-404-icon"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            <IconError404 />
          </div>
          <Headline
            :text="$t('shared.error.404.headline', $store.state.locale)"
            :subline="$t('shared.error.404.subheadline', $store.state.locale)"
          />
        </div>
        <div v-else>
          <Headline
            :text="$t('shared.error.default.headline', $store.state.locale)"
            :subline="error.message"
          />
        </div>
        <div
          class="error-body-home"
          data-aos="zoom-in-up"
          data-aos-duration="1000"
          data-aos-delay="1000"
          data-aos-once="true"
        >
          <nuxt-link to="/">
            <ButtonText :text="$t('shared.error.cancelButton', $store.state.locale)" />
          </nuxt-link>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Headline from '../Headline/Headline'
import ButtonText from '../ButtonText/ButtonText'
import Footer from '../Footer/Footer'
export default {
  name: 'Error',
  components: { Footer, ButtonText, Headline },
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    if (this.$sentry) {
      this.$sentry.captureException(new Error(JSON.stringify(this.error)))
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "Error";
</style>
