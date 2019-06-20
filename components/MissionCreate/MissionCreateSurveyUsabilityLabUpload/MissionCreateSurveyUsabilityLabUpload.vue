<template>
  <div class="mission-create-survey-usability-lab-upload">
    <p class="mission-create-survey-usability-lab-upload-headline">
      Design
    </p>
    <div class="mission-create-survey-usability-lab-upload-dropzone">
      <Dropzone :thumbnail-height="160" :multi-upload="multiUpload" @change="dzChange">
        <template slot="empty">
          <div class="mission-create-survey-usability-lab-upload-dropzone-empty">
            <div class="mission-create-survey-usability-lab-upload-dropzone-empty-icon">
              <IconFileImage />
            </div>
            <div class="mission-create-survey-usability-lab-upload-dropzone-empty-text">
              <p class="mission-create-survey-usability-lab-upload-dropzone-empty-text-title">
                {{ multiUpload ? 'Upload images' : 'Upload an image' }}
              </p>
              <p class="mission-create-survey-usability-lab-upload-dropzone-empty-text-subtitle">
                {{ multiUpload ? 'Click here or drag and drop images' : 'Click here or drag and drop an image' }}
              </p>
            </div>
          </div>
        </template>
        <template slot="custom-bg">
          <div class="mission-create-survey-usability-lab-upload-dropzone-button">
            <ButtonText type="CUSTOM" text="Browse files" :bg-color-class="item.type" />
          </div>
        </template>
      </Dropzone>
    </div>
  </div>
</template>

<script>
import Dropzone from '../../_shared/Dropzone/Dropzone'
import ButtonText from '../../_shared/ButtonText/ButtonText'
export default {
  name: 'MissionCreateSurveyUsabilityLabUpload',
  components: { ButtonText, Dropzone },
  props: {
    index: {
      type: Number,
      required: true
    },
    multiUpload: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    item() {
      return this.$store.state.missionFormSurvey.items[this.index]
    }
  },
  methods: {
    dzChange(value) {
      if (this.multiUpload) {
        this.$store.commit('missionFormSurvey/setItemImageMediaIds', {
          imageMediaIds: value,
          itemIndex: this.index
        })
      } else {
        this.$store.commit('missionFormSurvey/setItemImageMediaId', {
          imageMediaId: value,
          itemIndex: this.index
        })
      }
    }
  }
}
</script>

<style lang="scss">
  @import "MissionCreateSurveyUsabilityLabUpload";
</style>
