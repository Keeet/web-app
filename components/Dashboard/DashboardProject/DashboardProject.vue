<template>
  <div class="dashboard-project">
    <div
      data-aos="fade-up"
      data-aos-duration="700"
      data-aos-once="true"
      :data-aos-delay="aosDelay"
      data-aos-anchor="body"
    >
      <div class="dashboard-project-inner">
        <div class="dashboard-project-rows">
          <div class="dashboard-project-text">
            <p class="dashboard-project-text-title">
              {{ title }}
            </p>
            <p class="dashboard-project-text-description">
              <no-ssr>
                <ellipsis
                  :text="descriptionFormatted"
                  :line-num="3"
                  font-size="16px"
                  font-family="Roboto"
                  left="..."
                  tag-name="span"
                />
              </no-ssr>
            </p>
          </div>
          <div class="dashboard-project-owner">
            <ThumborImage
              :src="owner.profileImage"
              :title="`${owner.firstName} ${owner.lastName}`"
              :width="90"
              :height="90"
            />
          </div>
        </div>
        <div class="dashboard-project-footer">
          <div class="dashboard-project-footer-created">
            <IconCalendarOutline />
            <no-ssr>
              <timeago v-if="createdAt" :datetime="createdAt" :auto-update="1" />
            </no-ssr>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ThumborImage from '../../_shared/ThumborImage/ThumborImage'
export default {
  name: 'DashboardProject',
  components: { ThumborImage },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: null
    },
    createdAt: {
      type: String,
      default: null
    },
    owner: {
      type: Object,
      required: true
    },
    aosDelay: {
      type: Number,
      default: null
    }
  },
  computed: {
    descriptionFormatted() {
      const maxLength = 100
      if (!this.description) {
        return 'Enter you project description here to explain what you want to achieve with this research session'.substr(0, maxLength)
      }
      if (this.description.length > maxLength) {
        return `${this.description.substr(0, maxLength)}...`
      }
      return this.description
    }
  }
}
</script>

<style scoped lang="scss">
  @import "DashboardProject";
</style>
