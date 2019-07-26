<template>
  <div>
    <OverlayModal
      v-if="$hasRole('ADMIN')"
      title="Add billing address"
      @close="hide"
    >
      <BillingForm @submitted="hide" />
    </OverlayModal>
    <Confirm
      v-else
      title="Billing address missing"
      :text="noAdminText"
      label-confirm="Billing preferences"
      label-cancel="Cancel"
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
