import React, { useRef, useState, useEffect, useLayoutEffect, useMemo, useReducer } from 'react'

// the first instance gets the data from the server
// all instances will update once the data has been received
// dispatch is guaranteed to be stable through the life of a particular react component
// so dispatch is used to as the subscriber to identify the component uniquely
// the data is stored in the fuction, so it is accessible whenever the function is called - even if multiple components
// data is added when a user creates a topic or question. It is also sent to the server.

/*
<IotaDb>
  <GetTopicCards>
    <CardStore />
  </GetTopicCards>
</IotaDb>
*/
export function IotaDb(props) {
  const { user, unmobQuestionId } = props // separate because these props should be in otherProps to pass to children
  const { children, ...otherProps } = props
  const [state, dispatch] = useReducer((state, action) => ({ iteration: state.iteration + 1 }), { iteration: 0 }) // action doesn't matter - always increment iteration
  if (!user) return <div style={{ color: 'white', width: '100%', textAlign: 'center' }}>User Login Required</div>
  if (typeof socket === 'undefined') {
    if (!IotaDb.subscribers) IotaDb.subscribers = []
    if (!IotaDb.data) IotaDb.data = []
    return children // probably running on storybook or the server
  }
  useEffect(() => {
    return () => {
      console.info('unmounting IotaDb')
      if (IotaDb.subscribers && IotaDb.subscribers.length > 0)
        console.error('but there are subscribers left', IotaDb.subscribers.length)
    }
  }, [])
  if (!IotaDb.data && !IotaDb.subscribers) {
    // the first one through
    IotaDb.subscribers = [] // the first instance won't rerender unless we put dispatch here
    socket.emit('get-topics-and-questions', unmobQuestionId, 0, results => {
      IotaDb.data = results
      for (const subscriber of IotaDb.subscribers) subscriber()
    })
  } else if (!IotaDb.data) {
    // no data yet, but request has been made
    if (!IotaDb.subscribers.some(s => s === dispatch))
      // we are new here
      IotaDb.subscribers.push(dispatch)
  } // else we have been here before
  if (!IotaDb.data) return <div style={{ color: 'white', width: '100%', textAlign: 'center' }}>Waiting for Iotas</div>
  else
    return React.cloneElement(React.Children.only(children), {
      ...otherProps,
      iotaDb: { data: IotaDb.data, iteration: state.iteration },
    })
}

export default IotaDb

// after IotaDb has been "rendered" any children can useIotaDb to get the data
// const iotaDb=useIotaDb()

export function useIotaDb() {
  const [state, dispatch] = useReducer((state, action) => ({ data: IotaDb.data, iteration: state.iteratation + 1 }), {
    data: IotaDb.data,
    iteration: 0,
  })
  if (!IotaDb.subscribers.some(s => s === dispatch))
    // we are new here
    IotaDb.subscribers.push(dispatch)
  useEffect(() => {
    return () => {
      console.info('unmounting useIotaDb')
      const index = IotaDb.subscribers.findIndex(dispatch)
      if (index >= 0) IotaDb.subscribers.splice(index, 1)
    }
  }, [])
  return state
}

export function createTopic(card) {
  if (IotaDb.data.some(doc => doc._id === card._id)) return // bacause ask might get run again but we may need to do more
  if (typeof socket !== 'undefined') socket.emit('create-topic', card, () => {}) // socket apis won't exist in storybook
  IotaDb.data.push(card)
  IotaDb.iteration += 1
  for (const subscriber of IotaDb.subscribers) subscriber()
}

export function createQuestion(card) {
  if (IotaDb.data.some(doc => doc._id === card._id)) return // bacause ask might get run again but we may need to do more
  if (typeof socket !== 'undefined') socket.emit('create-question', card, () => {}) // socket apis won't exist in storybook
  IotaDb.data.push(card)
  IotaDb.iteration += 1
  for (const subscriber of IotaDb.subscribers) subscriber()
}
