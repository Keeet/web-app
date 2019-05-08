<template>
  <div class="persona-avatar">
    <div class="persona-avatar-name">
      <Input
        type="UNDERLINED_LARGE"
        placeholder="Persona Name"
        mutation="personaForm/setName"
        :value="personaForm.name"
        :max-characters="15"
      />
    </div>
    <div class="persona-avatar-icons">
      <div class="persona-avatar-icons-headline">
        Pick your Avatar
      </div>
      <div class="persona-avatar-icons-content">
        <div
          v-for="(range, x) in [[0,3],[3,6],[6,9]]"
          :key="x"
          class="persona-avatar-icons-content-row"
        >
          <PersonaIcon
            v-for="(personaIcon, y) in personaIcons.slice(range[0], range[1])"
            :key="y + range[0]"
            :icon="personaIcon"
            :disabled="personaForm.icon && personaIcon !== personaForm.icon"
            small
            @click="setIcon(personaIcon)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PERSONA_ICONS } from '../../_shared/constants'
import PersonaIcon from '../../_shared/PersonaIcon/PersonaIcon'
import Input from '../../_shared/Input/Input'
export default {
  name: 'PersonaAvatar',
  components: { Input, PersonaIcon },
  data() {
    return {
      PERSONA_ICONS
    }
  },
  computed: {
    personaForm() {
      return this.$store.state.personaForm
    },
    personaIcons() {
      const result = []
      for (const key in PERSONA_ICONS) {
        result.push(PERSONA_ICONS[key])
      }
      return result
    }
  },
  methods: {
    setIcon(icon) {
      if (this.personaForm.icon !== icon) {
        this.$store.commit('personaForm/setIcon', icon)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "PersonaAvatar";
</style>
