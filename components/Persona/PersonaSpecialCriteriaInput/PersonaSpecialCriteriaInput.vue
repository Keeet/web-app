<template>
  <div class="persona-special-criteria-input">
    <input
      v-model="value"
      class="persona-special-criteria-input-field"
      :placeholder="placeholder"
      @keyup.enter="addItem"
      @blur="blur"
    >
    <div class="persona-special-criteria-input-icon">
      <span class="blue">
        <IconPlus v-if="isNew && value !== ''" @click="addItem" />
      </span>
      <IconDelete v-if="!isNew" @click="deleteItem" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonaSpecialCriteriaInput',
  props: {
    screenerIndex: {
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
      return this.screenerIndex === null
    },
    s() {
      return this.$store.state.personaForm
    },
    value: {
      get() {
        if (this.isNew) {
          return this.s.newScreenerQuestion
        } else {
          return this.s.screenerQuestions[this.screenerIndex].value
        }
      },
      set(value) {
        if (this.isNew) {
          this.$store.commit('personaForm/setNewScreenerQuestion', value)
        } else {
          this.$store.commit('personaForm/setScreenerQuestion', { value, index: this.screenerIndex })
        }
      }
    }
  },
  methods: {
    blur() {
      if (!this.isNew && this.value === '') {
        this.deleteItem()
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
  @import "PersonaSpecialCriteriaInput";
</style>
