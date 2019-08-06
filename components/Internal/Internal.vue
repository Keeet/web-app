<template>
  <div>
    <InternalTestUser />
    <InternalCompanies />
  </div>
</template>

<script>
import InternalCompanies from './InternalCompanies/InternalCompanies'
import InternalTestUser from './InternalTestUser/InternalTestUser'
export default {
  name: 'Internal',
  components: { InternalTestUser, InternalCompanies }
}
</script>
