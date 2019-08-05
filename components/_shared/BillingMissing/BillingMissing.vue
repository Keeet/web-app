<template>
  <div>
    <OverlayModal
      v-if="$hasRole('ADMIN')"
      :title="$t('shared.billingMissing.billingFormTitle', $store.state.locale)"
      @close="hide"
    >
      <BillingForm @submitted="hide" />
    </OverlayModal>
    <Confirm
      v-else
      :title="$t('shared.billingMissing.noAdmin.title', $store.state.locale)"
      :text="noAdminText"
      :label-confirm="$t('shared.billingMissing.noAdmin.confirmLabel', $store.state.locale)"
      :label-cancel="$t('shared.billingMissing.noAdmin.cancelLabel', $store.state.locale)"
      full-width
      no-close
      @confirm="$router.push('/account/billing')"
      @cancel="hide"
    />
  </div>
</template>

<script>
import Confirm from '../Confirm/Confirm'
import OverlayModal from '../OverlayModal/OverlayModal'
import BillingForm from '../BillingForm/BillingForm'
export default {
  name: 'BillingMissing',
  components: { BillingForm, OverlayModal, Confirm },
  props: {
    noAdminText: {
      type: String,
      required: true
    }
  },
  methods: {
    hide() {
      this.$emit('hide')
    }
  }
}
</script>
