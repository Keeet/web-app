<template>
  <div class="persona-icon" :class="{ whiteBg, noClick, disabled }">
    <div class="persona-icon-image" :class="[`${icon.toLowerCase()}-bg`, { small, adjustSize }]">
      <IconPersonaChantal v-if="icon === ICONS.CHANTAL" />
      <IconPersonaDustin v-if="icon === ICONS.DUSTIN" />
      <IconPersonaJacqueline v-if="icon === ICONS.JACQUELINE" />
      <IconPersonaJason v-if="icon === ICONS.JASON" />
      <IconPersonaJustin v-if="icon === ICONS.JUSTIN" />
      <IconPersonaKevin v-if="icon === ICONS.KEVIN" />
      <IconPersonaMandy v-if="icon === ICONS.MANDY" />
      <IconPersonaMarvin v-if="icon === ICONS.MARVIN" />
      <IconPersonaMika v-if="icon === ICONS.MIKA" />
    </div>
    <div v-if="name" class="persona-icon-name">
      {{ name }}
    </div>
  </div>
</template>

<script>
import { PERSONA_ICONS as ICONS } from '../../constants'

export default {
  name: 'PersonaIcon',
  props: {
    icon: {
      type: String,
      required: true,
      validator: value => Object.keys(ICONS).includes(value)
    },
    name: {
      type: String,
      default: null
    },
    whiteBg: {
      type: Boolean,
      default: false
    },
    noClick: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    adjustSize: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ICONS
    }
  }
}
</script>

<style scoped lang="scss">
  @import "PersonaIcon";
</style>
