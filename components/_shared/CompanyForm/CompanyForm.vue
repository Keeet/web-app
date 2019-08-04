<template>
  <div class="company-form">
    <Input
      title="Company name*"
      placeholder="Keeet"
      :value="s.name"
      mutation="companyForm/setName"
      :error="nameError"
      :disable-error="!showErrors"
    />
    <ButtonText
      :text="edit ? 'Save changes' : 'Go'"
      :disabled="!formValid"
      @click="submitForm"
      @disabledClick="showErrors = true"
    />
  </div>
</template>

<script>
import { COUNTRY_LABELS } from '../../constants'
import Input from '../Input/Input'
import ButtonText from '../ButtonText/ButtonText'

export default {
  name: 'CompanyForm',
  components: { ButtonText, Input },
  props: {
    id: {
      type: String,
      default: null
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showErrors: false,
      COUNTRY_LABELS
    }
  },
  computed: {
    s() {
      return this.$store.state.companyForm
    },
    nameError() { return this.s.name !== '' ? null : 'required' },
    formValid() {
      return (
        !this.nameError
      )
    }
  },
  methods: {
    submitForm() {
      this.$store.dispatch('companyForm/submit').then(() => {
        this.$emit('submit')
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "CompanyForm";
</style>
