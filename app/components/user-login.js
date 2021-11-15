import React, { useRef, useState, useEffect, useLayoutEffect, useMemo, useReducer } from 'react'
import { createUseStyles } from 'react-jss'
import { useLogin } from './login-store'
import cx from 'classnames'
import InputElement from './input-element'
import CheckButton from './check-button'

export function UserLogin(props) {
  const { children, className, ...otherProps } = props
  const { userInfo = {} } = props // these props should be passed to children in otherProps
  const classes = useStyles()
  function onChange(userInfo) {
    console.info({ ...userInfo, ...props.userInfo })
  }
  const [state, methods] = useLogin({ ...props, onChange })

  const [sideEffects] = useState([])
  useEffect(() => {
    while (sideEffects.length) sideEffects.shift()()
  })
  const [authenticated, setAuthenticated] = useState(!!props.user)
  if (authenticated && props.user)
    // if calling skip- have to wait for authentication and the user info to be refreshed
    return React.Children.map(children, child =>
      React.cloneElement(child, {
        ...otherProps,
      })
    )
  else
    return (
      <div className={cx(className, classes.outer)}>
        <div className={classes.largeDesc}>
          For this app to work, we need to leave cookies in your browser. We would also like to get your email so we can
          invite you back when there is more input to review on this discussion, or when the conclusion has been
          reached. But your email is not required at this time.
        </div>
        <InputElement
          className={classes.email}
          name="email"
          defaultValue={userInfo.email}
          onDone={(done, value) => done && methods.onChangeEmail(value)}
        />
        <div className={classes.agree}>
          <span className={classes.agreeLine}>
            I agree to the{' '}
            <a style={{ color: 'inherit' }} href="https://enciv.org/terms" target="blank">
              terms of service and cookies
            </a>{' '}
            <CheckButton
              className={classes.agreeLine}
              onDone={(done, value) => {
                done && methods.onChangeAgree(value)
                done &&
                  value &&
                  !state.errpr &&
                  sideEffects.push(() =>
                    methods.skip(results => {
                      setAuthenticated(true)
                    })
                  )
              }}
            />
          </span>
        </div>
        <div className={classes.messages}>
          {state.error && <div className={classes.error}>{state.error}</div>}
          {state.info && <div className={classes.info}>{state.info}</div>}
          {state.success && <div className={classes.success}>{state.success}</div>}
        </div>
      </div>
    )
}

export default UserLogin

const useStyles = createUseStyles({
  outer: {
    position: 'relative',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    color: 'white',
  },
  agree: {
    width: '100%',
    lineHeight: '3em',
    color: 'inherit',
  },
  agreeLine: {
    verticalAlign: 'middle',
    color: 'inherit',
  },
  email: {
    width: '100%',
    color: 'inherit',
    '& ::placeholder': {
      color: 'white',
    },
  },
  error: {
    color: 'red',
  },
  info: {
    color: 'white',
  },
  success: {
    color: 'green',
    fontSize: '125%',
  },
  PageHeader: {
    marginBottom: '3rem',
    '& h1': {
      /* Bold 35 */
      position: 'static',
      margin: {
        left: '0',
        right: '0',
        top: '1rem',
        bottom: '0',
      },

      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '2.5rem',
      lineHeight: '3rem',

      color: 'white',
    },

    '& h3': {
      /* Regular 16 */
      position: 'static',
      margin: {
        left: '0',
        right: '0',
        top: '1rem',
        bottom: '0',
      },

      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '1.25rem',
      lineHeight: '1.5rem',

      color: 'white',
    },
  },
  largeSubj: {
    color: '#ffffff',
    textAlign: 'left',
    marginLeft: '2.063rem',
    marginRight: '2.063rem',
    fontSize: '3.125rem',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
  },
  largeDesc: {
    color: '#ffffff',
    textAlign: 'left',
    marginLeft: '2.063rem',
    marginRight: '2.063rem',
    marginTop: '2rem',
    marginBottom: '1rem', // include space at bottom for arrow button
    fontSize: '2.5rem',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
  },
})
