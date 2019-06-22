<template>
  <div class="project-create">
    <div class="project-create-cancel">
      <ButtonCircle type="ARROW_LEFT" @click="$router.back()" />
    </div>
    <div v-if="!s.pending" class="project-create-form">
      <Headline text="Give your project a name!" center />
      <div
        data-aos="fade-in"
        data-aos-duration="700"
        data-aos-once="true"
        :data-aos-delay="500"
      >
        <div class="project-create-form-input">
          <Input
            type="UNDERLINED_LARGE"
            :value="s.title"
            :error="titleError"
            mutation="projectForm/setTitle"
            placeholder="Project Name"
            :disable-error="!showErrors"
            @enter="() => { formValid ? submit() : showErrors = true }"
          />
        </div>
        <div class="project-create-form-submit">
          <ButtonText text="Create" :disabled="!formValid" @click="submit" @disabledClick="showErrors = true" />
        </div>
      </div>
    </div>
    <Loading v-if="s.pending" fixed-center />
  </div>
</template>

<script>
import Headline from '../_shared/Headline/Headline'
import Input from '../_shared/Input/Input'
import ButtonText from '../_shared/ButtonText/ButtonText'
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
import Loading from '../_shared/Loading/Loading'
export default {
  name: 'ProjectCreate',
  components: { Loading, ButtonCircle, ButtonText, Input, Headline },
  data() {
    return { showErrors: false }
  },
  computed: {
    s() {
      return this.$store.state.projectForm
    },
    projects() {
      return this.$store.state.projects
    },
    titleError() {
      if (this.s.title === '') {
        return 'required'
      }
      if (this.projects.map(p => p.title).includes(this.s.title)) {
        return 'name already used'
      }
      return null
    },
    formValid() {
      return !this.titleError
    }
  },
  methods: {
    submit() {
      this.$store.commit('projectForm/pending')
      this.$push.upsertProject(this.s).then((data) => {
        const { id } = data
        this.$router.push(`/projects/${id}`, () => { this.$store.commit('projectForm/submitted') })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "ProjectCreate";
</style>
