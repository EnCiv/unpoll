import React, { useRef, useState, useEffect, useLayoutEffect, useMemo, useReducer } from 'react'

import useMethods from '../lib/use-methods'
import superagent from 'superagent'
import Isemail from 'isemail'

/*
<LoginStore onChange={()=>{}} store="loginStore". userInfo={{}} newLocation="/anywhere">
    <LoginUI>
</LoginStore>
*/

export function authenticateSocketIo(cb) {
  // after joining or loging in the socket needs to reconnect to get the authentication cookie in the header so it can be authenticated. Many api calls require the user to be authenticated
  if (typeof window !== 'undefined' && window.socket) {
    var reconnectFailed = setTimeout(() => {
      logger.error('Join.authenticateSocketIo timed out')
      cb()
    }, 10 * 1000)
    const onConnect = () => {
      clearTimeout(reconnectFailed)
      window.socket.removeListener('connect', onConnect)
      cb()
    }
    const onDisconnect = reason => {
      if (reason !== 'io client disconnect')
        logger.info('Join.authenticate unexpected disconnect reason:', reason, '... Continuing')
      window.socket.removeListener('disconnect', onDisconnect)
      window.socket.open()
    }
    window.socket.on('connect', onConnect)
    window.socket.on('disconnect', onDisconnect)
    window.socket.close()
  } else cb()
}

export const LoginStore = props => {
  const { store = 'loginStore', onChange, children, newLocation, ...otherProps } = props
  const [state, methods] = useLogin(props)
  return React.Children.map(children, child =>
    React.cloneElement(child, { ...otherProps, [store]: { state, methods } })
  )
}

export default LoginStore

export function useLogin(props) {
  const { onChange, newLocation, userInfo = {} } = props
  const [state, methods] = useMethods(
    (dispatch, state) => {
      return {
        authenticateSocketIo: authenticateSocketIo,
        onChangeAgree(agree) {
          dispatch({ agree: !!agree })
        },
        onChangeEmail(email) {
          if (email && !Isemail.validate(email))
            dispatch({ email, error: 'email address is not valid', info: '', success: '' })
          else dispatch({ email, error: '', info: '', success: '' })
        },
        skip(cb) {
          const { agree, email } = state

          if (!agree) {
            dispatch({ error: 'Please agree to our terms of service', info: '', success: '' })
            return
          }

          if (email && !Isemail.validate(email)) {
            dispatch({ error: 'email address is not valid', info: '', success: '' })
            return
          }

          window.onbeforeunload = null // stop the popup about navigating away

          // for skip - the password is just a unique signature
          let password = ''
          let length = Math.floor(Math.random() * 9) + 8 // the lenght will be between 8 and 16 characters
          for (; length > 0; length--) {
            password += String.fromCharCode(65 + Math.floor(Math.random() * 26)) // any character between A and Z
          }

          superagent
            .post('/tempid')
            .send({ ...userInfo, email, password }) // don't want children to see password -
            .end((err, res) => {
              if (err) logger.error('LoginStore.skip error', err)
              switch (res.status) {
                case 401:
                  dispatch({ error: 'This email address is already taken', info: '', success: '' })
                  break
                case 200:
                  dispatch({ error: '', success: 'Welcome aboard!', info: '' })
                  if (cb) authenticateSocketIo(cb)
                  else if (onChange) authenticateSocketIo(() => onChange({ userId: JSON.parse(res.text).id }))
                  else if (newLocation) setTimeout(() => (location.href = newLocation), 800)
                  break
                default:
                  dispatch({
                    error: 'unexpected error: ' + '(' + res.status + ') ' + (err || 'Unknown'),
                    info: '',
                    success: '',
                  })
                  break
              }
            })
        },
        login() {
          const { email, password } = state

          window.onbeforeunload = null // stop the popup about navigating away

          superagent
            .post('/sign/in')
            .send({ ...userInfo, email, password })
            .end((err, res) => {
              if (err) logger.error('Join.login error', err)
              switch (res.status) {
                case 429:
                  dispatch({ error: 'Too many attempts logging in, try again in 24 hrs', info: '', success: '' })
                  return
                case 404:
                  dispatch({ error: "Email / Password Don't Match", info: '', success: '' }) // email not found but don't say that to the user
                  return
                case 401:
                  dispatch({ error: "Email / Password Don't Match", info: '', success: '' }) // Wrong Password but dont say that to the users
                  return
                case 200:
                  dispatch({ error: '', info: '', success: 'Welcome back' })
                  if (onChange) authenticateSocketIo(() => onChange({ userId: JSON.parse(res.text).id }))
                  else if (newLocation) setTimeout(() => (location.href = this.props.newLocation), 800)
                  return
                default:
                  dispatch({ error: 'Unknown error', info: '', success: '' })
                  return
              }
            })
          dispatch({ error: '', info: 'Logging you in...' })
        },
      }
    },
    { agree: false, error: '', success: '', info: '' }
  )
  return [state, methods]
}
