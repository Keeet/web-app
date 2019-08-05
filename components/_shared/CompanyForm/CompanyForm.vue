<template>
  <div class="company-form">
    <Input
      :title="$t('shared.companyForm.companyLabel', $store.state.locale)"
      :placeholder="$t('shared.companyForm.companyPlaceholder', $store.state.locale)"
      :value="s.name"
      mutation="companyForm/setName"
      :error="nameError"
      :disable-error="!showErrors"
    />
    <ButtonText
      :text="submitText"
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
    },
    submitText() {
      return this.edit
        ? this.$t('shared.companyForm.updateButton', this.$store.state.locale)
        : this.$t('shared.companyForm.createButton', this.$store.state.locale)
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
