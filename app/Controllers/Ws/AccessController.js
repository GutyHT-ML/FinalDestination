'use strict'

class AccessController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onLogin (data) {
    console.log(this.socket.id)
  }
}

module.exports = AccessController
