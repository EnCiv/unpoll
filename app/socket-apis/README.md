# Socket API Directory

Each file in the directory represents an api call. The root of the name of the file (eg socketlogger of socketlogger.js) is the name of the socket.io event that corresponding to the api. The paramaters of the api are determined by the definition of the function.

```
'use strict'

function socketlogger(loggingEvent) {
  loggingEvent.data.push({ socketId: this.id, userId: this.synuser ? this.synuser.id : 'anonymous' })
  bslogger[loggingEvent.level.levelStr.toLowerCase()](loggingEvent.startTime, ...loggingEvent.data)
}

export default socketlogger
```

To call this API from the browser side you would use

```
window.socket.emit('socketlogger', loggingEvent)
```

an api function can have any number of parameters, it can also have a call-back as it's final parameter.
