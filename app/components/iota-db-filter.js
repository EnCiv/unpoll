import React, { useRef, useState, useEffect, useLayoutEffect, useMemo, useReducer } from 'react'
import { useIotaDb } from '../components/iota-db'
import CardStore from './card-store'
/*
<IotaDb>
  <IotaDbTopics>
    <Childern />
  </IotaDbTopics>
</IotaDb>

filer is a function like: doc => doc.webComponent === 'Topic'
*/
export function IotaDbFilter(props) {
  const { children, filter, store, dependencies = () => [], ...otherProps } = props // separate because these props should be in otherProps to pass to children
  const iotaDb = useIotaDb() // don't do const{data}=useIotaDb because data doesn't change but iotaDb does.
  const { data = [] } = iotaDb
  const initialState = useMemo(
    () => ({
      cards: data.filter(filter),
    }),
    [iotaDb, filter, ...dependencies(props)]
  )
  return (
    <CardStore initialState={initialState} store={store}>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          ...otherProps,
          initialState,
        })
      )}
    </CardStore>
  )
}

export default IotaDbFilter
