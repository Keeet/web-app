<template>
  <div class="mission-create-calendar-plugin">
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
      :event-constraint="{
        startTime: '09:00',
        endTime: '18:00'
      }"
      slot-duration="00:15:00"
      slot-label-interval="01:00"
      min-time="09:00:00"
      max-time="18:00:00"
      scroll-time="09:00:00"
      :select-overlap="(e) => e.rendering !== 'background'"
      :column-header-html="getColumnHeaderHtml"
      :slot-label-format="getSlotLabel"
      :default-date="getFirstValidDateString()"
      :events="allEvents"
      @dateClick="dateClick"
      @select="select"
      @eventDrop="eventChange"
      @eventResize="eventChange"
      @eventRender="eventRender"
    />
    <Confirm
      v-if="s.sessionErrorPopup"
      title="Timeslot not available"
      text="We need at least 5 workdays to recruit your test users."
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
import { addDays, addMinutes, stripISOTime, getWeekDayName, getMonthName } from '../../../utils/dateUtils'
import Confirm from '../../_shared/Confirm/Confirm'

export default {
  name: 'MissionCreateCalendarPlugin',
  components: {
    Confirm,
    FullCalendar
  },
  data() {
    return {
      calendarPlugins: [ timeGridPlugin, interactionPlugin ]
    }
  },
  computed: {
    api() {
      return this.$refs.fullCalendar.getApi()
    },
    allEvents() {
      const events = this.s.sessions.slice()
      events.push({
        start: '2000-01-01',
        end: this.getFirstValidDateString(),
        overlap: false,
        rendering: 'background',
        color: '#d2dae2'
      })
      return events
    },
    s() {
      return this.$store.state.missionForm
    }
  },
  methods: {
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
      addMinutes(end, this.s.duration)
      this.$store.commit('missionForm/addSession', { id: uuidv4(), start, end })
    },
    eventChange(e) {
      this.$store.commit('missionForm/changeSession', e.event)
    },
    eventRender({ el, event }) {
      if (el.classList.contains('fc-time-grid-event')) {
        el.innerHTML += '<div class="close">X</div>'
        el.getElementsByClassName('close')[0].addEventListener('click', () => this.removeEvent(event))
      }
    },
    removeEvent(event) {
      this.$store.commit('missionForm/removeSession', event.id)
    },
    getFirstValidDate() {
      const d = new Date()
      addDays(d, 7)
      switch (d.getDay()) {
        case 6: addDays(d, 2); break
        case 0: addDays(d, 1); break
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
      return `
        <div class="fc-widget-header-days-custom">
          <p class="fc-widget-header-days-custom-day">${getWeekDayName(date)}</p>
          <p class="fc-widget-header-days-custom-month">${getMonthName(date).substr(0, 3)} ${date.getUTCDate() + 1}</p>
        </div>
      `
    },
    getSlotLabel(e) {
      const date = e.date.marker
      let hours = date.getUTCHours()
      const ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12
      hours = hours === 0 ? 12 : hours
      return `${hours} ${ampm}`
    },
    showSessionErrorPopup() {
      this.$store.commit('missionForm/showSessionErrorPopup')
    },
    hideSessionErrorPopup() {
      this.$store.commit('missionForm/hideSessionErrorPopup')
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
  @import "MissionCreateCalendarPlugin";
</style>
