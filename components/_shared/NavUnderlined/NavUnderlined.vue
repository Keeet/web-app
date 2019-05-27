<template>
  <div
    :data-aos="!disableAnimation ? 'fade-up' : ''"
    data-aos-duration="1000"
    data-aos-once="true"
  >
    <div class="nav-underlined">
      <div
        v-for="(item, x) in items"
        :key="x"
        class="nav-underlined-item"
      >
        <nuxt-link :to="item.link">
          <span class="nav-underlined-item-label" :class="{active: item.page === activePage}">
            {{ item.label }}
          </span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavUnderlined',
  props: {
    items: {
      type: Array,
      required: true,
      validator: (items) => {
        let valid = true
        items.forEach((item) => {
          if (!item.page || !item.label || !item.link) {
            valid = false
          }
        })
        return valid
      }
    },
    activePage: {
      type: String,
      required: true
    },
    disableAnimation: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "NavUnderlined";
</style>
