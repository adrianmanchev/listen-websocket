const url = require('./config/url')
const StreamController = require('./controller')

const fs = require('fs')
const {
  Console
} = require('console')
const output = fs.createWriteStream(__dirname + '/logs/stdout.log')
const errorOutput = fs.createWriteStream(__dirname + '/logs/stderr.log')
const logger = new Console({
  stdout: output,
  stderr: errorOutput
})

const socket = require('socket.io-client')(url.baseUrl, {
  autoConnect: true,
  reconnectionAttempts: 3,
  transports: ['websocket']
})

const callbacks = {
  connect: () => logger.log(new Date(), 'web socket@' + url.baseUrl, 'ConnectID: ' + socket.id),
  connect_error: response => logger.error(new Date(), 'connect_error', response.message),
  disconnect: reason => logger.error(new Date(), 'disconnect', reason),
  reconnect_error: response => logger.error(new Date(), 'reconnect_error', response.message),
  reconnect_failed: () => logger.error(new Date(), 'reconnect_failed'),
  message: StreamController,
  prices: response => logger.log(new Date(), response)
}

for (let event in callbacks) {
  socket.on(event, callbacks[event])
}