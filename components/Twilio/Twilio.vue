<template>
  <div class="twilio">
    <div class="twilio-head">
      <div class="twilio-head-logo">
        <Logo />
      </div>
      <div class="twilio-head-local-stream">
        <video id="local-stream-video" />
      </div>
    </div>
    <div class="twilio-join">
      <div v-if="!!twilio.loading" class="twilio-join-loading">
        <div class="twilio-join-loading-animation">
          <Loading />
        </div>
        <div class="twilio-join-loading-text">
          {{ twilio.loading }}
        </div>
      </div>
      <div v-if="twilio.joinButtonActive" class="twilio-join-room-button">
        <ButtonText text="Join session" @click="joinCall" />
        <ButtonText
          v-if="twilio.isCompany"
          :text="missionId ? 'Back to mission' : 'Back to app'"
          type="GREY"
          @click="companyCancel"
        />
      </div>
    </div>
    <div v-show="twilio.callActive" class="twilio-call">
      <div v-show="twilio.remoteStreamActive" class="twilio-call-remote-stream">
        <video id="remote-stream-video" :class="{ vertical: remoteVideoVertical }" />
      </div>
      <div class="twilio-call-end" @click="disconnect">
        <IconEndCall />
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../_shared/Loading/Loading'
import Logo from '../_shared/Logo/Logo'
import ButtonText from '../_shared/ButtonText/ButtonText'

const LOCAL_STREAM_VIDEO = 'local-stream-video'
const REMOTE_STREAM_VIDEO = 'remote-stream-video'

export default {
  name: 'Twilio',
  components: { ButtonText, Logo, Loading },
  data() {
    return {
      remoteVideoVertical: false,
      localTrack: null
    }
  },
  computed: {
    twilio() {
      return this.$store.state.twilio
    },
    missionId() {
      const mission = this.$store.state.mission
      return mission ? mission.id : null
    }
  },
  mounted() {
    // eslint-disable-next-line no-console
    this.$twilioHelper.setupLocalPreview().then(this.setLocalVideoTrack).catch(console.error)
    this.$store.commit('twilio/showJoinButton')

    if (this.twilio.isCompany) {
      this.joinCall()
    }

    window.addEventListener('beforeunload', this.disconnect)
    document.getElementById(REMOTE_STREAM_VIDEO).addEventListener('resize', this.onRemoteTrackResize)
    this.onRemoteTrackResize()
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.disconnect)
    document.getElementById(REMOTE_STREAM_VIDEO).removeEventListener('resize', this.onRemoteTrackResize)
    this.stopLocalVideoTrack()
  },
  methods: {
    joinCall() {
      this.$store.commit('twilio/hideJoinButton')
      this.$store.commit('twilio/showLoading', 'Connecting to video stream...')
      this.$twilioHelper.joinRoom(this.twilio.sessionId, this.twilio.token, {
        joined: (room) => {
          this.$store.commit('twilio/setRoom', room)
          this.$store.commit('twilio/showCall')
          this.$store.commit('twilio/showLoading', 'Waiting for other participant...')
        },
        participantConnected: (participant) => {
          this.renderParticipantTracks(participant)
        },
        participantDisconnected: () => {
          this.$store.commit('twilio/showLoading', 'The other participant has left the room...')
          this.setRemoteVideoTrack(null)
        },
        // eslint-disable-next-line no-console
        error: console.error
      })
    },
    renderParticipantTracks(participant) {
      participant.tracks.forEach((publication) => {
        if (publication.isSubscribed) {
          this.setRemoteVideoTrack(publication.track)
        }
      })
      participant.on('trackSubscribed', this.setRemoteVideoTrack)
    },
    setLocalVideoTrack(track) {
      track.attach(`#${LOCAL_STREAM_VIDEO}`)
      this.localTrack = track
    },
    stopLocalVideoTrack() {
      if (this.localTrack) {
        this.localTrack.mediaStreamTrack.stop()
        this.localTrack.detach()
      }
    },
    setRemoteVideoTrack(track) {
      if (track) {
        track.attach(`#${REMOTE_STREAM_VIDEO}`)
        this.$store.commit('twilio/showRemoteStream')
      } else {
        this.$store.commit('twilio/hideRemoteStream')
      }
    },
    disconnect() {
      this.twilio.room.disconnect()
      this.setRemoteVideoTrack(null)
      this.$store.commit('twilio/hideLoading')
      this.$store.commit('twilio/hideCall')
      this.$store.commit('twilio/showJoinButton')
    },
    companyCancel() {
      const missionId = this.missionId
      if (missionId) {
        this.$router.push(`/missions/${missionId}`)
      } else {
        this.$router.push('/')
      }
    },
    onRemoteTrackResize() {
      const vid = document.getElementById(REMOTE_STREAM_VIDEO)
      this.remoteVideoVertical = vid.videoHeight > vid.videoWidth
    }
  }
}
</script>

<style lang="scss">
  @import "Twilio";
</style>
