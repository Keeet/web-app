import Video from 'twilio-video'

export default function ({ store }, inject) {
  inject('twilioHelper', {
    joinRoom(roomName, token, cb = {
      joined: () => {},
      participantConnected: () => {},
      participantDisconnected: () => {},
      error: () => {}
    }) {
      Video.connect(token, {
        name: roomName,
        audio: true,
        video: { width: 640 }
      }).then((room) => {
        cb.joined(room)

        room.participants.forEach(cb.participantConnected)

        room.on('participantConnected', cb.participantConnected)
        room.on('participantDisconnected', cb.participantDisconnected)
        room.on('disconnected', (room) => {
          // Detach the local media elements
          room.localParticipant.tracks.forEach((publication) => {
            const attachedElements = publication.track.detach()
            attachedElements.forEach(element => element.remove())
          })
        })
      }, (error) => {
        cb.error(`Unable to connect to Room: ${error.message}`)
      })
    },
    setupLocalPreview() {
      return Video.createLocalVideoTrack({
        video: {
          width: 200
        }
      })
    }
  })
}
