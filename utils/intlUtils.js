import {
  MISSION_SURVEY_ITEM_LIKERT_INTL_KEYS,
  MISSION_SURVEY_ITEM_LIKERT_OPTIONS_INTL_KEYS
} from '../components/constants'

export function getLikertOptionsByTypeAndLocale(type, locale) {
  const likertIntlKey = MISSION_SURVEY_ITEM_LIKERT_INTL_KEYS[type]
  return MISSION_SURVEY_ITEM_LIKERT_OPTIONS_INTL_KEYS[type].map((optionIntlKey) => {
    return this.$t(`survey.items.likert.${likertIntlKey}.${optionIntlKey}`, locale)
  })
}
