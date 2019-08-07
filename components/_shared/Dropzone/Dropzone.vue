<template>
  <div :id="errorId" class="dropzone" :class="{ error: error && !disableError }">
    <NuxtDropzone
      :id="id"
      :ref="id"
      :options="options"
      :destroy-dropzone="true"
      @vdropzone-file-added="addedFile"
      @vdropzone-sending="sending"
      @vdropzone-success="success"
    />
    <span class="dropzone-nav" :class="{ navAlignLeft }">
      <span v-if="!isEmpty" class="dropzone-nav-delete" @click="clearItems">
        {{
          multiUpload
            ? $t('shared.dropzone.multiDelete', $store.state.locale)
            : $t('shared.dropzone.singleDelete', $store.state.locale)
        }}
      </span>
      <span v-if="error && !disableError" class="dropzone-nav-error">
        {{ error }}
      </span>
    </span>
    <div v-if="isEmpty && $slots.empty" class="dropzone-empty">
      <slot name="empty" />
    </div>
    <slot name="custom-bg" />
    <div class="dropzone-item-delete template">
      <IconDelete />
    </div>
  </div>
</template>

<script>
import uuid from 'uuid'
import NuxtDropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'
import { MEDIA_UPLOAD_PATH } from '../../constants'

export default {
  name: 'Dropzone',
  components: { NuxtDropzone },
  props: {
    path: {
      type: String,
      default: MEDIA_UPLOAD_PATH.DEFAULT
    },
    mutation: {
      type: String,
      default: null
    },
    thumbnailWidth: {
      type: Number,
      default: null
    },
    thumbnailHeight: {
      type: Number,
      default: null
    },
    multiUpload: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    },
    dispatchError: {
      type: String,
      default: undefined
    },
    disableError: {
      type: Boolean,
      default: false
    },
    navAlignLeft: {
      type: Boolean,
      default: false
    },
    alreadyUploadedFiles: {
      type: [Array, Object],
      default: null
    }
  },
  data() {
    return {
      id: uuid.v4(),
      errorId: uuid.v4(),
      dz: null,
      selected: []
    }
  },
  computed: {
    options() {
      const options = {
        url: `${process.env.baseUrl}${this.path}`,
        acceptedFiles: 'image/jpg,image/jpeg,image/png',
        maxFilesize: 10,
        dictDefaultMessage: '',
        dictResponseError: 'Request failed with status code {{statusCode}}',
        autoQueue: false
      }
      const { thumbnailWidth, thumbnailHeight } = this
      if (thumbnailWidth) {
        options.thumbnailWidth = thumbnailWidth
      }
      if (thumbnailHeight) {
        options.thumbnailHeight = thumbnailHeight
      }
      return options
    },
    isEmpty() {
      return !this.dz || !this.dz.files.length
    },
    dzFilesPending() {
      if (!this.dz || !this.selected) {
        return []
      }
      return !!this.dz.files.find(file => ['added', 'queued', 'uploading'].includes(file.status))
    }
  },
  watch: {
    selected(value) {
      let result
      if (this.multiUpload) {
        result = value.map(item => item.id)
      } else {
        result = value.length ? value[0].id : null
      }

      this.$emit('change', result)
      if (this.mutation) {
        this.$store.commit(this.mutation, result)
      }
    },
    dzFilesPending(pending) {
      if (this.dispatchError) {
        this.$store.dispatch(this.dispatchError, { id: this.errorId, error: pending ? 'pending' : null })
      }
    },
    error: {
      immediate: true,
      handler(error) {
        if (this.dispatchError) {
          this.$store.dispatch(this.dispatchError, { id: this.errorId, error })
        }
      }
    }
  },
  mounted() {
    this.dz = this.$refs[this.id].dropzone

    if (this.alreadyUploadedFiles) {
      this.setAlreadyUploadedFiles()
    }
  },
  beforeDestroy() {
    if (this.dispatchError) {
      this.$store.dispatch(this.dispatchError, { id: this.errorId, error: null })
    }
  },
  methods: {
    addedFile(newFile) {
      if (!this.multiUpload && this.dz.files.length > 1) {
        const oldFiles = this.dz.files.filter(file => file.upload.uuid !== newFile.upload.uuid)
        oldFiles.forEach((oldFile) => {
          this.removeFile(oldFile)
        })
      }
      const deleteTemplate = document.querySelector('.dropzone-item-delete.template').cloneNode(true)
      deleteTemplate.classList.remove('template')
      deleteTemplate.addEventListener('click', () => {
        this.removeFile(newFile)
      })
      newFile.previewElement.appendChild(deleteTemplate)

      if (newFile.alreadyUploaded) {
        newFile.previewElement.querySelector('.dz-size').innerHTML = ''
        newFile.previewElement.querySelector('.dz-filename').innerHTML = ''
        return
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
      this.$store.commit('addDropzoneUpload', { id: res.id, url: res.spacesUrl })
      this.selected.push({
        dzId: file.upload.uuid,
        id: res.id
      })
    },
    removeFile(file) {
      this.dz.removeFile(file)
      this.selected = this.selected.filter(item => item.dzId !== file.upload.uuid)
    },
    clearItems() {
      this.dz.removeAllFiles(true)
      this.selected = []
    },
    setAlreadyUploadedFiles() {
      const propFiles = Array.isArray(this.alreadyUploadedFiles)
        ? this.alreadyUploadedFiles
        : [this.alreadyUploadedFiles]
      const files = propFiles.map(file => ({
        dataURL: `https://images.keeet.io/unsafe/300x300/${encodeURIComponent(file.url)}`,
        alreadyUploaded: true,
        upload: {
          uuid: uuid.v4()
        },
        id: file.id,
        status: 'success'
      }))
      files.forEach((file) => {
        this.dz.files.push(file)
        this.dz.emit('addedfile', file)
        this.dz.createThumbnailFromUrl(file,
          this.dz.options.thumbnailWidth,
          this.dz.options.thumbnailHeight,
          this.dz.options.thumbnailMethod, true, (thumbnail) => {
            this.dz.emit('thumbnail', file, thumbnail)
          }, true)
        this.dz.emit('complete', file)
        this.selected.push({
          dzId: file.upload.uuid,
          id: file.id
        })
      })
    }
  }
}
</script>

<style lang="scss">
  @import "Dropzone";
</style>
