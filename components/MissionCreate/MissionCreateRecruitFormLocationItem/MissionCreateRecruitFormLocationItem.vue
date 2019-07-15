<template>
  <div class="mission-create-recruit-form-location-item" :class="{ active }">
    <div class="mission-create-recruit-form-location-item-inner">
      <div v-if="location && !create" class="mission-create-recruit-form-location-item-content">
        <div class="mission-create-recruit-form-location-item-content-icon">
          <IconLocation />
        </div>
        <div class="mission-create-recruit-form-location-item-content-address">
          <p>{{ location.name }}</p>
          <p>{{ location.street }} {{ location.houseNumber }}</p>
          <p v-if="location.addressDescription">
            {{ location.addressDescription }}
          </p>
          <p>{{ location.zipCode }} {{ location.city }}</p>
          <p>{{ COUNTRY_LABELS[location.country] }}</p>
        </div>
      </div>
      <div v-if="create" class="mission-create-recruit-form-location-item-empty">
        <div class="mission-create-recruit-form-location-item-empty-icon">
          <IconPlus />
        </div>
        <p class="mission-create-recruit-form-location-item-empty-text">
          Add new location
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { COUNTRY_LABELS } from '../../constants'

export default {
  name: 'MissionCreateRecruitFormLocationItem',
  props: {
    location: {
      type: Object,
      default: null
    },
    active: {
      type: Boolean,
      default: false
    },
    create: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { COUNTRY_LABELS }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitFormLocationItem";
</style>
