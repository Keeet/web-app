import {
  MISSION_SURVEY_CUSTOM_SCREEN_TYPES,
  MISSION_SURVEY_ITEM_LIKERT_INTL_KEYS,
  MISSION_SURVEY_ITEM_LIKERT_OPTIONS_INTL_KEYS
} from '../components/constants'

export function getLikertOptionsByTypeAndLocale(type, locale) {
  const likertIntlKey = MISSION_SURVEY_ITEM_LIKERT_INTL_KEYS[type]
  return MISSION_SURVEY_ITEM_LIKERT_OPTIONS_INTL_KEYS[type].map((optionIntlKey) => {
    return this.$t(`survey.items.likert.${likertIntlKey}.${optionIntlKey}`, locale)
  })
}

export function getCustomScreenDefaultValues(type, language) {
  let intlTitleKey, intlDescriptionKey
  switch (type) {
    case MISSION_SURVEY_CUSTOM_SCREEN_TYPES.WELCOME:
      intlTitleKey = 'survey.welcomeTitle'
      intlDescriptionKey = 'survey.welcomeDescription'
      break
    case MISSION_SURVEY_CUSTOM_SCREEN_TYPES.CLOSING:
      intlTitleKey = 'survey.closingTitle'
      intlDescriptionKey = 'survey.closingDescription'
      break
  }
  return {
    title: this.$t(intlTitleKey, language),
    description: this.$t(intlDescriptionKey, language)
  }
}
