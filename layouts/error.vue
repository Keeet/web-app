<template>
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
        <Headline text="Oops something went wrong." subline="An error occurred." />
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
</template>

<script>
import Footer from '../components/_shared/Footer/Footer'
import Headline from '../components/_shared/Headline/Headline'
import ButtonText from '../components/_shared/ButtonText/ButtonText'
export default {
  name: 'ErrorVue',
  components: { ButtonText, Headline, Footer },
  // eslint-disable-next-line vue/require-prop-types
  props: ['error'],
  fetch({ app: { $fetch } }) {
    return $fetch([{ name: 'USER' }])
  },
  layout: 'blank'
}
</script>

<style scoped lang="scss">
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
</style>
