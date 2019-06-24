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
export const MISSION_SURVEY_USABILITY_LAB_FOLLOW_UP_REQUIRED = [
  MISSION_SURVEY_USABILITY_LAB_ITEMS.FIVE_SECOND_TEST,
  MISSION_SURVEY_USABILITY_LAB_ITEMS.DESIGN_QUESTION,
  MISSION_SURVEY_USABILITY_LAB_ITEMS.QUESTION_LIST
]
export const MISSION_PAGES = {
  OVERVIEW: 'OVERVIEW',
  INSIGHTS: 'INSIGHTS'
}

export const MISSION_INSIGHTS = {
  RECORDING: 'RECORDING',
  LINK: 'LINK'
}
export const MISSION_INSIGHT_LABELS = {
  RECORDING: 'Record'
}
export const MISSION_INSIGHT_LINKS = {
  GENERIC: 'GENERIC',
  GOOGLE_DOCS: 'GOOGLE_DOCS',
  AIR_TABLE: 'AIR_TABLE'
}
export const MISSION_INSIGHT_LINK_LABELS = {
  GENERIC: 'Link',
  GOOGLE_DOCS: 'Google Docs',
  AIR_TABLE: 'Airtable'
}

export const ACCOUNT_PAGES = {
  PROFILE: 'PROFILE',
  TEAM: 'TEAM'
}

export const COUNTRY_NAMES = {
  DE: 'Germany'
}

export const LANGUAGES = {
  DE: 'DE',
  EN: 'EN'
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
