export const COUNTRY_NAMES = {
  DE: 'Germany',
  EN: 'United Kingdom',
  FR: 'France',
  ES: 'Spain',
  IT: 'Italy'
}

export const LANGUAGES = {
  DE: 'DE',
  EN: 'EN',
  FR: 'FR',
  ES: 'ES',
  IT: 'IT'
}
export const LANGUAGE_LABELS = {
  DE: 'German',
  EN: 'English',
  FR: 'French',
  ES: 'Spanish',
  IT: 'Italian'
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

export const PERSONA_ICONS = {
  CHANTAL: 'CHANTAL',
  JACQUELINE: 'JACQUELINE',
  MANDY: 'MANDY',
  KEVIN: 'KEVIN',
  MARVIN: 'MARVIN',
  JUSTIN: 'JUSTIN',
  DUSTIN: 'DUSTIN',
  JASON: 'JASON',
  MIKA: 'MIKA'
}
export const PERSONA_GENDERS = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  DIVERS: 'DIVERS'
}
export const PERSONA_GENDER_LABELS = {
  MALE: 'Male',
  FEMALE: 'Female',
  DIVERS: 'non binary'
}
export const PERSONA_COUNTRIES = [
  LANGUAGES.DE,
  LANGUAGES.EN,
  LANGUAGES.FR,
  LANGUAGES.ES,
  LANGUAGES.IT
]
export const PERSONA_OCCUPATIONS = {
  STUDENT: 'STUDENT',
  PART_TIME_EMPLOYEE: 'PART_TIME_EMPLOYEE',
  FULL_TIME_EMPLOYEE: 'FULL_TIME_EMPLOYEE',
  SELF_EMPLOYED: 'SELF_EMPLOYED',
  UNEMPLOYED: 'UNEMPLOYED',
  PENSIONER: 'PENSIONER',
  PUPIL: 'PUPIL',
  APPRENTICE: 'APPRENTICE'
}
export const PERSONA_OCCUPATION_LABELS = {
  STUDENT: 'Student',
  PART_TIME_EMPLOYEE: 'Part-time employee',
  FULL_TIME_EMPLOYEE: 'Full-time employee',
  SELF_EMPLOYED: 'Self employed',
  UNEMPLOYED: 'Unemployed',
  PENSIONER: 'Pensioner',
  PUPIL: 'Pupil',
  APPRENTICE: 'Apprentice'
}
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
export const MISSION_SURVEY_ITEM_LIKERT_OPTIONS = {
  AGREEMENT: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
  OCCURRENCE: ['Very rarely', 'Rarely', 'Occasionally', 'Frequently', 'Very frequently'],
  IMPORTANCE: ['Unimportant', 'Off little importance', 'Moderately important', 'Important', 'Very important'],
  QUALITY: ['Extremely poor', 'Below average', 'Average', 'Above average', 'Excellent'],
  COMPREHENSION: ['Did not understand', 'Understood a little', 'Understood most of it', 'Understood very well'],
  IMPRESSION: ['Very dissatisfied', 'Somewhat dissatisfied', 'Neutral', 'Somewhat satisfied', 'Very satisfied']
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
export const MISSION_SURVEY_USABILITY_LAB_ITEM_TITLE = {
  FIVE_SECOND_TEST: 'You will see the image for {{duration}} seconds'
}
export const MISSION_SURVEY_USABILITY_LAB_ITEM_SUBTITLE = {
  PREFERENCE_TEST: ['Click an image to zoom in', 'Click again to zoom out'],
  FIRST_CLICK: 'Click on the image to carry out the instructions or complete the set task.',
  MULTI_SELECT: 'You can choose one or more',
  FIVE_SECOND_TEST: 'Try to remember as much as you can.'
}
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
  TEAM: 'TEAM'
}
