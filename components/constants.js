export const COUNTRIES = {
  DE: 'DE',
  GB: 'GB',
  FR: 'FR',
  ES: 'ES'
}
export const COUNTRY_LABELS = {
  DE: 'Germany',
  GB: 'United Kingdom',
  FR: 'France',
  ES: 'Spain'
}

export const LANGUAGES = {
  DE: 'DE',
  EN: 'EN',
  FR: 'FR',
  ES: 'ES'
}
export const LANGUAGE_LABELS = {
  DE: 'German',
  EN: 'English',
  FR: 'French',
  ES: 'Spanish'
}

export const ROLES = {
  VIEWER: 'VIEWER',
  USER: 'USER',
  ADMIN: 'ADMIN'
}
export const ROLE_LABELS = {
  ADMIN: 'Admin',
  USER: 'User',
  VIEWER: 'Viewer'
}

export const MEDIA_UPLOAD_PATH = {
  DEFAULT: '/mediaFiles/input',
  MISSION: '/mediaFiles/mission'
}

export const BROWSER = {
  SAFARI: 'SAFARI',
  CHROME: 'CHROME',
  EDGE: 'EDGE',
  IE: 'IE',
  FIREFOX: 'FIREFOX',
  OTHER: 'OTHER'
}

export const OS = {
  MAC: 'MAC',
  WINDOWS: 'WINDOWS',
  LINUX: 'LINUX',
  ANDROID: 'ANDROID',
  IOS: 'IOS',
  OTHER: 'OTHER'
}

export const DEVICE_TYPE = {
  SMARTPHONE: 'SMARTPHONE',
  TABLET: 'TABLET',
  DESKTOP: 'DESKTOP'
}

export const PERSONA_CRITERIA = {
  AGE: 'AGE',
  GENDER: 'GENDER',
  LANGUAGE: 'LANGUAGE',
  COUNTRY: 'COUNTRY',
  DEVICE_SKILL: 'DEVICE_SKILL',
  SPECIAL_CRITERIA: 'SPECIAL_CRITERIA',
  DURATION: 'DURATION'
}
export const PERSONA_CRITERIA_LABELS = {
  AGE: 'Age',
  GENDER: 'Gender',
  LANGUAGE: 'Language',
  COUNTRY: 'Country',
  DEVICE_SKILL: 'Device Skill',
  SPECIAL_CRITERIA: 'Special Criteria',
  DURATION: 'Duration'
}
export const PERSONA_GENDERS = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  MIXED: 'MIXED'
}
export const PERSONA_GENDER_LABELS = {
  MALE: 'Male',
  FEMALE: 'Female',
  MIXED: 'Mixed'
}
export const PERSONA_COUNTRIES = [
  COUNTRIES.DE,
  COUNTRIES.GB,
  COUNTRIES.FR,
  COUNTRIES.ES
]
export const PERSONA_DEVICE_SKILLS = {
  DESKTOP: 'DESKTOP',
  SMART_PHONE: 'SMART_PHONE',
  TABLET: 'TABLET',
  SMART_WATCH: 'SMART_WATCH'
}
export const PERSONA_DEVICE_SKILL_LABELS = {
  DESKTOP: 'Desktop',
  SMART_PHONE: 'Smartphone',
  TABLET: 'Tablet',
  SMART_WATCH: 'Smart Watch'
}

export const MISSIONS = {
  IN_HOUSE: 'IN_HOUSE',
  REMOTE: 'REMOTE',
  USABILITY_LAB: 'USABILITY_LAB',
  SURVEY: 'SURVEY'
}
export const MISSION_LABELS = {
  IN_HOUSE: 'In-House',
  REMOTE: 'Remote',
  USABILITY_LAB: 'Usability Lab',
  SURVEY: 'Survey'
}
export const MISSION_CREATE_RECRUIT_MIN_ORDER_DURATION_DAYS = 2
export const MISSION_SURVEY_ITEMS = {
  SHORT_TEXT: 'SHORT_TEXT',
  LONG_TEXT: 'LONG_TEXT',
  SINGLE_SELECT: 'SINGLE_SELECT',
  MULTI_SELECT: 'MULTI_SELECT',
  LIKERT: 'LIKERT',
  LINEAR_SCALE: 'LINEAR_SCALE'
}
export const MISSION_SURVEY_ITEM_LABELS = {
  SHORT_TEXT: 'Short Text',
  LONG_TEXT: 'Long Text',
  SINGLE_SELECT: 'Single Select',
  MULTI_SELECT: 'Multi Select',
  LINEAR_SCALE: 'Linear Scale',
  LIKERT: 'Likert'
}
export const MISSION_SURVEY_SELECT_MIN_ITEMS = 2
// to change the "other-label" it is required to update all existing
// "other-responses" in the database accordingly (label must always match db-value)
export const MISSION_SURVEY_SELECT_OTHER_LABEL = 'Other'
export const MISSION_SURVEY_PREVIEW_LOCAL_STORAGE_KEY = 'surveyPreview'
export const MISSION_SURVEY_ITEM_LIKERT = {
  AGREEMENT: 'AGREEMENT',
  OCCURRENCE: 'OCCURRENCE',
  IMPORTANCE: 'IMPORTANCE',
  QUALITY: 'QUALITY',
  COMPREHENSION: 'COMPREHENSION',
  IMPRESSION: 'IMPRESSION'
}
export const MISSION_SURVEY_ITEM_LIKERT_LABELS = {
  AGREEMENT: 'Agreement',
  OCCURRENCE: 'Occurrence',
  IMPORTANCE: 'Importance',
  QUALITY: 'Quality',
  COMPREHENSION: 'Comprehension',
  IMPRESSION: 'Impression'
}
export const MISSION_SURVEY_ITEM_LIKERT_INTL_KEYS = {
  AGREEMENT: 'agreement',
  OCCURRENCE: 'occurrence',
  IMPORTANCE: 'importance',
  QUALITY: 'quality',
  COMPREHENSION: 'comprehension',
  IMPRESSION: 'impression'
}
export const MISSION_SURVEY_ITEM_LIKERT_OPTIONS_INTL_KEYS = {
  AGREEMENT: ['stronglyDisagree', 'disagree', 'neutral', 'agree', 'stronglyAgree'],
  OCCURRENCE: ['veryRarely', 'rarely', 'occasionally', 'frequently', 'veryFrequently'],
  IMPORTANCE: ['unimportant', 'offLittleImportance', 'moderatelyImportant', 'important', 'veryImportant'],
  QUALITY: ['extremelyPoor', 'belowAverage', 'average', 'aboveAverage', 'excellent'],
  COMPREHENSION: ['didNotUnderstand', 'understoodALittle', 'understoodMostOfIt', 'understoodVeryWell'],
  IMPRESSION: ['veryDissatisfied', 'somewhatDissatisfied', 'neutral', 'somewhatSatisfied', 'verySatisfied']
}
export const MISSION_SURVEY_USABILITY_LAB_ITEMS = {
  FIRST_CLICK: 'FIRST_CLICK',
  FIVE_SECOND_TEST: 'FIVE_SECOND_TEST',
  QUESTION_LIST: 'QUESTION_LIST',
  DESIGN_QUESTION: 'DESIGN_QUESTION',
  PREFERENCE_TEST: 'PREFERENCE_TEST',
  INSTRUCTION: 'INSTRUCTION'
}
export const MISSION_SURVEY_USABILITY_LAB_ITEM_LABELS = {
  FIRST_CLICK: 'First Click',
  FIVE_SECOND_TEST: 'Five Second Test',
  QUESTION_LIST: 'Questions',
  DESIGN_QUESTION: 'Design Question',
  PREFERENCE_TEST: 'Preference Test',
  INSTRUCTION: 'Instruction'
}
export const MISSION_SURVEY_USABILITY_LAB_ITEM_DEVICE_FRAMES = {
  NO_FRAME: 'NO_FRAME',
  PHONE_PORTRAIT: 'PHONE_PORTRAIT',
  PHONE_LANDSCAPE: 'PHONE_LANDSCAPE',
  TABLET_PORTRAIT: 'TABLET_PORTRAIT',
  TABLET_LANDSCAPE: 'TABLET_LANDSCAPE'
}
export const MISSION_SURVEY_USABILITY_LAB_ITEM_DEVICE_FRAME_LABELS = {
  NO_FRAME: 'No frame',
  PHONE_PORTRAIT: 'iPhone - Portrait',
  PHONE_LANDSCAPE: 'iPhone - Landscape',
  TABLET_PORTRAIT: 'Tablet - Portrait',
  TABLET_LANDSCAPE: 'Tablet - Landscape'
}
export const MISSION_SURVEY_USABILITY_LAB_FOLLOW_UP_REQUIRED = [
  MISSION_SURVEY_USABILITY_LAB_ITEMS.FIVE_SECOND_TEST,
  MISSION_SURVEY_USABILITY_LAB_ITEMS.DESIGN_QUESTION,
  MISSION_SURVEY_USABILITY_LAB_ITEMS.QUESTION_LIST
]
export const MISSION_SURVEY_USABILITY_LAB_ITEM_INSIGHTS = {
  FIVE_SECOND_TEST: 'Design shown for {duration}s',
  DESIGN_QUESTION: 'Design Question',
  QUESTION_LIST: 'Questions'
}
export const MISSION_RECRUIT_STUDY_TYPES = {
  USABILITY_TEST: 'USABILITY_TEST',
  USER_INTERVIEW: 'USER_INTERVIEW',
  FOCUS_GROUP: 'FOCUS_GROUP',
  WORKSHOP: 'WORKSHOP'
}
export const MISSION_RECRUIT_STUDY_TYPE_LABELS = {
  USABILITY_TEST: 'Usability Test',
  USER_INTERVIEW: 'User Interview',
  FOCUS_GROUP: 'Focus Group',
  WORKSHOP: 'Workshop'
}
export const MISSION_RECRUIT_PAGES = {
  OVERVIEW: 'OVERVIEW',
  INSIGHTS: 'INSIGHTS'
}
export const MISSION_RECRUIT_INSIGHTS = {
  RECORDING: 'RECORDING',
  LINK: 'LINK'
}
export const MISSION_RECRUIT_INSIGHT_LABELS = {
  RECORDING: 'Record'
}
export const MISSION_RECRUIT_INSIGHT_LINKS = {
  GENERIC: 'GENERIC',
  GOOGLE_DOCS: 'GOOGLE_DOCS',
  AIR_TABLE: 'AIR_TABLE'
}
export const MISSION_RECRUIT_INSIGHT_LINK_LABELS = {
  GENERIC: 'Link',
  GOOGLE_DOCS: 'Google Docs',
  AIR_TABLE: 'Airtable'
}
export const MISSION_SURVEY_PAGES = {
  RESULTS: 'RESULTS',
  SHARE: 'SHARE'
}

export const ACCOUNT_PAGES = {
  PROFILE: 'PROFILE',
  TEAM: 'TEAM',
  BILLING: 'BILLING'
}
