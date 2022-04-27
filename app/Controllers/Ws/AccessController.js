'use strict'

class AccessController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onRequest (data) {
    console.log(data)
    console.log(this.socket.topic)
  }

  onResponse (data) {
    console.log(data)
  }

  onMessage (data) {
    console.log(data)
    console.log(this.socket.topic)
    console.log(this.socket.event)
    this.socket.broadcastToAll('message', data)
  }
}

module.exports = AccessController
