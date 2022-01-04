import React, { useEffect, useState } from 'react'
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

export const decorators = [
  (Story, props) => {
    const [user, setUser] = useState(null)
    useEffect(() => {
      window.socket = {
        emit: (handle, email, href, cb) => {
          if (handle !== 'send-password') console.error('emit expected send-password, got:', handle)
          if (email === 'success@email.com') setTimeout(() => cb({ error: '' }), 1000)
          else setTimeout(() => cb({ error: 'User not found' }), 1000)
        },
        // when user authenticates socket io needs to close and then connect to authenticate the user
        // so we simulate that here
        onHandlers: {},
        on: (handle, handler) => {
          window.socket.onHandlers[handle] = handler
        },
        close: () => {
          if (window.socket.onHandlers.connect) {
            setTimeout(window.socket.onHandlers.connect, 1000)
            setTimeout(() => {
              setUser({ id: 'abc123', email: 'success@email.com' })
            }, 1500)
          } else console.error('No connect handler registered')
        },
        removeListener: () => {},
      }
    }, [])
    return Story({ args: { ...props.args, user } })
  },
]
