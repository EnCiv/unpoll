import React, { useRef, useState, useEffect, useLayoutEffect, useMemo, useReducer } from 'react'

import { useAuth } from 'civil-client'

/*
<LoginStore onChange={()=>{}} store="loginStore". userInfo={{}} newLocation="/anywhere">
    <LoginUI>
</LoginStore>
*/

export const LoginStore = props => {
  const { store = 'loginStore', onChange, userInfo, children, newLocation, ...otherProps } = props
  const [state, methods] = useAuth(onChange || newLocation, userInfo)
  return React.Children.map(children, child =>
    React.cloneElement(child, { ...otherProps, [store]: { state, methods } })
  )
}

export default LoginStore
