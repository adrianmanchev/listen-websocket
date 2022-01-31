# listen-websocket

Quick start for any websocket connection

Starts a socket.io-client that connects to the provided address and listens for messages.

```
require('socket.io-client')(url.baseUrl, {
  autoConnect: true,
  reconnectionAttempts: 3,
  transports: ['websocket']
})
```