'use strict'

class AccessController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onRequest (data) {
    console.log(data)
  }

  onResponse (data) {
    console.log(data)
  }

  onLogin (data) {
    console.log(data.grantedAccess)
  }

  onAuth (data) {
    console.log(data)
  }
}

module.exports = AccessController
