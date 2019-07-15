<template>
  <div class="mission-create-recruit-calendar-plugin">
    <FullCalendar
      ref="fullCalendar"
      default-view="timeGridWeek"
      :plugins="calendarPlugins"
      :weekends="false"
      :selectable="true"
      :all-day-slot="false"
      :now-indicator="true"
      :editable="true"
      :event-duration-editable="false"
      slot-duration="00:15:00"
      slot-label-interval="01:00"
      scroll-time="09:00:00"
      :business-hours="true"
      :select-overlap="(e) => e.rendering !== 'background'"
      :column-header-html="getColumnHeaderHtml"
      :slot-label-format="getSlotLabel"
      :default-date="getDefaultDate()"
      :events="allEvents"
      @dateClick="dateClick"
      @select="select"
      @eventDrop="eventChange"
      @eventResize="eventChange"
      @eventRender="eventRender"
      @dayRender="dayRender"
    />
    <Confirm
      v-if="s.recruit.sessionErrorPopup"
      title="Timeslot not available"
      :text="`We need at least ${MISSION_CREATE_RECRUIT_MIN_ORDER_DURATION_DAYS} workdays to recruit your test users.`"
      label-confirm="Earliest available timeslots"
      label-confirm-arrow="RIGHT"
      :label-cancel="null"
      full-width
      @close="hideSessionErrorPopup"
      @confirm="jumpToAvailableDate"
    />
  </div>
</template>

<script>
import uuidv4 from 'uuid/v4'
import FullCalendar from '@fullcalendar/vue'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import {
  addDays,
  addMinutes,
  stripISOTime,
  getWeekDayName,
  getMonthName,
  isSameDay,
  getAmPmHours
} from '../../../utils/dateUtils'
import Confirm from '../../_shared/Confirm/Confirm'
import { MISSION_CREATE_RECRUIT_MIN_ORDER_DURATION_DAYS } from '../../constants'

export default {
  name: 'MissionCreateRecruitCalendarPlugin',
  components: {
    Confirm,
    FullCalendar
  },
  props: {
    singleSelect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      calendarPlugins: [ timeGridPlugin, interactionPlugin ],
      MISSION_CREATE_RECRUIT_MIN_ORDER_DURATION_DAYS
    }
  },
  computed: {
    api() {
      return this.$refs.fullCalendar.getApi()
    },
    allEvents() {
      const events = []
      const markedDays = []
      events.push({
        start: '2000-01-01',
        end: this.getFirstValidDateString(),
        overlap: false,
        rendering: 'background',
        color: '#d2dae2'
      })
      this.s.recruit.sessions.forEach((session) => {
        if (markedDays.filter(marked => isSameDay(marked, session.start)).length === 0) {
          const end = new Date(session.start.getTime())
          addDays(end, 1)
          events.push({
            start: stripISOTime(session.start),
            end: stripISOTime(end),
            rendering: 'background',
            color: '#b7e0ef'
          })
          markedDays.push(session.start)
        }
      })
      this.s.recruit.sessions.forEach((session) => {
        events.push(session)
      })
      return events
    },
    s() {
      const { missionForm, missionFormRecruit } = this.$store.state
      return {
        ...missionForm,
        recruit: missionFormRecruit
      }
    },
    duration() {
      return parseInt(this.s.recruit.duration)
    }
  },
  created() {
    this.s.recruit.sessions.forEach((session, x) => {
      if (this.singleSelect && x > 0) {
        this.$store.commit('missionFormRecruit/removeSession', session.id)
        return
      }
      const newSession = { ...session }
      const end = new Date(newSession.start.getTime())
      addMinutes(end, this.duration)
      newSession.end = end
      this.$store.commit('missionFormRecruit/changeSession', newSession)
    })
  },
  methods: {
    dayRender(e) {
      const { date } = e
      if (date.getDay() === 1 && (!this.s.recruit.activeCalendarDay || !isSameDay(this.s.recruit.activeCalendarDay, date))) {
        this.$store.commit('missionFormRecruit/setActiveCalendarDay', date)
      }
    },
    dateClick(e) {
      const { date } = e
      if (date > this.getFirstValidDate()) {
        this.addNewEvent(date)
        this.api.unselect()
      } else {
        this.showSessionErrorPopup()
      }
    },
    select(e) {
      const { start, end } = e
      if (end - start > 900000) {
        this.addNewEvent(start)
        this.api.unselect()
      }
    },
    addNewEvent(start) {
      const end = new Date(start.getTime())
      addMinutes(end, this.duration)
      if (this.singleSelect && this.s.recruit.sessions.length > 0) {
        const existingSession = this.s.recruit.sessions[0]
        this.eventChange({ event: { id: existingSession.id, start, end } })
        return
      }
      this.$store.commit('missionFormRecruit/addSession', { id: uuidv4(), start, end })
    },
    eventChange(e) {
      this.$store.commit('missionFormRecruit/changeSession', e.event)
    },
    eventRender({ el, event }) {
      if (el.classList.contains('fc-time-grid-event')) {
        el.innerHTML += '<div class="close">X</div>'
        el.getElementsByClassName('close')[0].addEventListener('click', () => this.removeEvent(event))
      }
    },
    removeEvent(event) {
      this.$store.commit('missionFormRecruit/removeSession', event.id)
    },
    getDefaultDate() {
      if (!this.s.recruit.activeCalendarDay) {
        return this.getFirstValidDateString()
      }
      return stripISOTime(this.s.recruit.activeCalendarDay)
    },
    getFirstValidDate() {
      const d = new Date()
      addDays(d, MISSION_CREATE_RECRUIT_MIN_ORDER_DURATION_DAYS)
      switch (d.getDay()) {
        case 6:
          addDays(d, 2)
          break
        case 0:
          addDays(d, 1)
          break
      }
      d.setHours(0)
      d.setMinutes(0)
      d.setSeconds(0)
      d.setMilliseconds(0)
      return d
    },
    getFirstValidDateString() {
      return stripISOTime(this.getFirstValidDate())
    },
    getColumnHeaderHtml(date) {
      const today = isSameDay(date, new Date()) ? ' today' : ''
      return `
        <div class="fc-widget-header-days-custom${today}">
          <p class="fc-widget-header-days-custom-day">${getWeekDayName(date)}</p>
          <p class="fc-widget-header-days-custom-month">${getMonthName(date).substr(0, 3)} ${date.getDate()}</p>
        </div>
      `
    },
    getSlotLabel(e) {
      const date = e.date.marker
      return getAmPmHours(date, true)
    },
    showSessionErrorPopup() {
      this.$store.commit('missionFormRecruit/showSessionErrorPopup')
    },
    hideSessionErrorPopup() {
      this.$store.commit('missionFormRecruit/hideSessionErrorPopup')
    },
    jumpToAvailableDate() {
      this.api.gotoDate(this.getFirstValidDate())
      this.hideSessionErrorPopup()
    }
  }
}
</script>

<style lang="scss">
  @import "@fullcalendar/core/main.css";
  @import "@fullcalendar/timegrid/main.css";
  @import "MissionCreateRecruitCalendarPlugin";
</style>
