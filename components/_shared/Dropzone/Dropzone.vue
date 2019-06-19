<template>
  <div class="dropzone">
    <NuxtDropzone
      :id="id"
      :ref="id"
      :options="options"
      :destroy-dropzone="true"
      @vdropzone-file-added="addedFile"
      @vdropzone-sending="sending"
      @vdropzone-success="success"
    />
    <span v-if="dz && dz.files.length" class="dropzone-delete" @click="clearItems">
      delete
    </span>
    <div v-else class="dropzone-empty">
      <IconFileImage />
      <p class="dropzone-empty-text">
        Upload a photo / logo
      </p>
    </div>
  </div>
</template>

<script>
import uuid from 'uuid'
import NuxtDropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'

export default {
  name: 'Dropzone',
  components: { NuxtDropzone },
  props: {
    mutation: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      id: uuid.v4(),
      dz: null
    }
  },
  computed: {
    options() {
      return {
        url: `${process.env.baseUrl}/mediaFiles/input`,
        thumbnailMethod: 'contain',
        acceptedFiles: 'image/*',
        thumbnailWidth: 400,
        maxFilesize: 5,
        dictDefaultMessage: '',
        dictResponseError: 'Request failed with status code {{statusCode}}',
        autoQueue: false
      }
    }
  },
  mounted() {
    this.dz = this.$refs[this.id].dropzone
  },
  methods: {
    addedFile(newFile) {
      if (this.dz.files.length > 1) {
        const oldFiles = this.dz.files.filter(file => file.dataURL !== newFile.dataURL)
        oldFiles.forEach((oldFile) => {
          this.dz.removeFile(oldFile)
        })
      }
      // do not ask why
      newFile.accepted = true

      if (this.$auth.isAuthenticated()) {
        this.dz.enqueueFile(newFile)
      } else {
        const redirectUrl = window.location.pathname + window.location.search
        this.$auth.renewTokensOrRedirectToLogin(redirectUrl, { router: this.$router }).then(() => {
          this.dz.enqueueFile(newFile)
          // eslint-disable-next-line no-console
        }).catch(console.error)
      }
    },
    sending(file, xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${this.$store.state.accessToken}`)
    },
    success(file, res) {
      this.$store.commit(this.mutation, res.id)
    },
    clearItems() {
      this.dz.removeAllFiles(true)
      this.$store.commit(this.mutation, null)
    }
  }
}
</script>

<style lang="scss">
  @import "Dropzone";
</style>
