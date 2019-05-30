<template>
  <div class="dashboard-project">
    <div class="dashboard-project-inner">
      <div class="dashboard-project-rows">
        <div class="dashboard-project-text">
          <p class="dashboard-project-text-title">
            {{ title }}
          </p>
          <p class="dashboard-project-text-description">
            <ellipsis
              :text="descriptionFormatted"
              :line-num="3"
              font-size="16px"
              font-family="Roboto"
              left="..."
              tag-name="span"
            />
          </p>
        </div>
        <div class="dashboard-project-owner">
          <img :src="owner.profileImage" :title="`${owner.firstName} ${owner.lastName}`">
        </div>
      </div>
      <div class="dashboard-project-footer">
        <div class="dashboard-project-footer-created">
          <IconCalendarOutline />
          <timeago v-if="createdAt" :datetime="createdAt" :auto-update="1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardProject',
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
