<template>
  <div class="mission-persona-criteria-item-special-criteria-input">
    <input
      v-if="!(isNew && s.specialCriteria.length >= 2)"
      v-model="value"
      class="mission-persona-criteria-item-special-criteria-input-field"
      :placeholder="placeholder"
      @keyup.enter="addItem"
      @blur="blur"
    >
    <div class="mission-persona-criteria-item-special-criteria-input-icon">
      <span class="blue">
        <IconPlus v-if="isNew && value !== ''" @click="addItem" />
      </span>
      <IconDelete v-if="!isNew" @click="deleteItem" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MissionPersonaCriteriaItemSpecialCriteriaInput',
  props: {
    index: {
      type: Number,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  computed: {
    isNew() {
      return this.index === null
    },
    s() {
      return this.$store.state.missionFormPersona
    },
    value: {
      get() {
        if (this.isNew) {
          return this.s.newSpecialCriteria
        } else {
          return this.s.specialCriteria[this.index].value
        }
      },
      set(value) {
        if (this.isNew) {
          this.$store.commit('missionFormPersona/setNewSpecialCriteria', value)
        } else {
          this.$store.commit('missionFormPersona/setSpecialCriteria', { value, index: this.index })
        }
      }
    }
  },
  methods: {
    blur() {
      if (!this.isNew && this.value === '') {
        this.deleteItem()
      }
      if (this.isNew && this.value !== '') {
        this.addItem()
      }
    },
    addItem() {
      if (this.value !== '') {
        this.$emit('add')
      }
    },
    deleteItem() {
      this.$emit('delete')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionPersonaCriteriaItemSpecialCriteriaInput";
</style>
