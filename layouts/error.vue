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
          <Headline text="Oops something went wrong." subline="The page you are looking for was not found." />
        </div>
        <div v-else>
          <Headline text="Oops something went wrong." :subline="error.message" />
        </div>
        <div
          class="error-body-home"
          data-aos="zoom-in-up"
          data-aos-duration="1000"
          data-aos-delay="1000"
          data-aos-once="true"
        >
          <nuxt-link to="/">
            <ButtonText text="Back to Homepage" />
          </nuxt-link>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from '../components/_shared/Footer/Footer'
import Headline from '../components/_shared/Headline/Headline'
import ButtonText from '../components/_shared/ButtonText/ButtonText'
export default {
  name: 'ErrorVue',
  components: { ButtonText, Headline, Footer },
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  fetch({ app: { $fetch } }) {
    return $fetch([{ name: 'USER' }])
  },
  mounted() {
    this.$sentry.captureException(new Error(JSON.stringify(this.error)))
  },
  layout: 'blank'
}
</script>

<style lang="scss">
  // workaround to avoid rendering the error page into current template
  .error-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10000;
    overflow-y: auto;
    background-color: $grey-light;

    .error {
      display: flex;
      flex-direction: column;
      height: 100vh;

      .error-body {
        position: relative;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;

        .error-body-404 {
          margin: 0 auto;

          .error-body-404-icon {
            width: 100%;
            max-width: 400px;
            margin: 0 auto 80px;

            svg {
              width: 100%;
            }
          }
        }

        .error-body-home {
          margin: 30px auto 0;
          width: 200px;
        }
      }
    }
  }
</style>
