import React, { useRef, useState, useEffect, useLayoutEffect, useMemo, useReducer } from 'react'

import useMethods from '../lib/use-methods'

function IotaDb(props) {
  const { user, unmobQuestionId } = props // separate because these props should be in otherProps to pass to children
  const { children, ...otherProps } = props
  if (!user) return <div style={{ color: 'white', width: '100%', textAlign: 'center' }}>User Login Required</div>
  if (typeof socket === 'undefined') return children // probably running on storybook or something
  if (!IotaDB.data && !IotaDb.subscribers) {
    IotaDb.subscribers = []
    socket.emit('get-topics-in-bins-and-questions', unmobQuestionId, 0, results => {
      IotaDb.data = results
    })
  } else if (!IotaDB.data)
    if (!IotaDB.data) return <div style={{ color: 'white', width: '100%', textAlign: 'center' }}>Waiting for Cards</div>
    else return React.cloneElement(React.Children.only(children), { ...otherProps, iotaDb: IotaDb.data })
}
