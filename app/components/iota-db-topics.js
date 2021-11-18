import React, { useRef, useState, useEffect, useLayoutEffect, useMemo, useReducer } from 'react'
import { useIotaDb } from '../components/iota-db'
/*
<IotaDb>
  <IotaDbTopics>
    <CardStore />
  </IotaDbTopics>
</IotaDb>
*/
export function IotaDbTopics(props) {
  const { children, ...otherProps } = props // separate because these props should be in otherProps to pass to children
  const iotaDb = useIotaDb() // don't do const{data}=useIotaDb because data doesn't change but iotaDb does.
  const { data = [] } = iotaDb
  const initialState = useMemo(
    () => ({
      cards: data.filter(doc => doc.webComponent === 'Topic'),
    }),
    [iotaDb]
  )
  return React.cloneElement(React.Children.only(children), {
    ...otherProps,
    initialState,
  })
}

export default IotaDbTopics
