<template>
  <div class="dropzone">
    <NuxtDropzone
      :id="id"
      :ref="id"
      :options="{
        url: '#',
        thumbnailMethod: 'contain',
        acceptedFiles: 'image/*',
        thumbnailWidth: 400,
        maxFilesize: 2,
        dictDefaultMessage: '',
        dictResponseError: 'Request failed with status code {{statusCode}}'
      }"
      :destroy-dropzone="true"
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
  mounted() {
    this.dz = this.$refs[this.id].dropzone
    this.dz.on('addedfile', this.addedfile)
    this.dz.on('success', this.success)
  },
  methods: {
    addedfile(newFile) {
      if (this.dz.files.length > 1) {
        const oldFiles = this.dz.files.filter(file => file.dataURL !== newFile.dataURL)
        oldFiles.forEach((oldFile) => {
          this.dz.removeFile(oldFile)
        })
      }
    },
    success(file, res) {
      const fileId = 'id_from_res'
      this.$store.commit(this.mutation, fileId)
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
