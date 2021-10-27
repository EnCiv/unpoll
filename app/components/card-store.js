import React, { useRef, useState, useEffect, useLayoutEffect, useMemo, useReducer } from 'react'

import useMethods from '../lib/use-methods'

/**
 methodState: {
     cards: [
         {_id: string, description: "string"}, 
         {_id: string, cards: []},
         ...
        ],
    iteration: number
 }
 the object methodState.cards will be mutated but never changed
 iteration will increase with each change to cards or one of it's childern
 */

// defaultValue has been a great way to pass in data for storybook testing but in the real application we want to fetch the data from the db
// but we don't want to call useMethods - or render the children until the data has been fetched
// and react errors out if a different number of hooks are called on subsiquent renders - though it does't error out if 0 hooks are called first, and hooks are called later
// so we separated CardsStore into two parts, the first part that has all the hooks except useMethods, but won't do any hooks if defaultValue is passed

export const CardStore = props => {
  const { defaultValue, ...otherProps } = props
  if (defaultValue) return <CardStoreInner initialState={{ cards: defaultValue.slice() }} {...otherProps} />
  if (!props.user) return <div style={{ color: 'white', width: '100%', textAlign: 'center' }}>User Login Required</div>
  const [initialState, setInitialState] = useState(undefined)
  const [topicBins, setTopicBins] = useState([])
  useEffect(() => {
    if (typeof socket !== 'undefined')
      socket.emit('get-topics-in-bins-and-questions', props.unmobQuestion, 0, results => {
        setTopicBins(results)
        setInitialState({ cards: results.map(bin => (bin.topicObjs.length === 1 ? bin.topicObjs[0] : bin.topicObjs)) })
      })
  }, [])
  if (!initialState) return <div style={{ color: 'white', width: '100%', textAlign: 'center' }}>Waiting for Cards</div>
  else return <CardStoreInner initialState={initialState} {...otherProps} />
}

function isCardInCards(card, cards) {
  for (const crd of cards) {
    if (Array.isArray(crd)) {
      if (isCardInCards(card, crd)) return true
    } else {
      if (card._id === crd._id) return true
    }
  }
  return false
}
export const CardStoreInner = props => {
  const { children, initialState, ...otherProps } = props

  const [methodState, methods] = useMethods((dispatch, methodState) => {
    return {
      addCard(card) {
        if (isCardInCards(card, methodState.cards)) return
        card.subject = card.description
        card.parentId = props.unmobQuestion
        methodState.cards.push(card)
        if (typeof socket !== 'undefined') socket.emit('create-topic', card, () => {}) // socket apis won't exist in storybook
        dispatch({ iteration: methodState.iteration + 1 })
      },
      toGroupAddId(group, id) {
        const groupIndex = methodState.cards.findIndex(crd => crd.cards && crd._id === group)
        if (groupIndex >= 0) {
          if (groupIndex >= 0) {
            let cardIndex = methodState.cards.findIndex(crd => crd._id === id)
            if (cardIndex >= 0) {
              let cards = methodState.cards
              let card = cards[cardIndex]
              cards[groupIndex].cards.push(card)
              cards.splice(cardIndex, 1) // remove card from list after manipulation because removing will change index
              dispatch({ iteration: methodState.iteration + 1 })
              return
            } else logger.error('cardStore.toGroupAddId id:', id, 'not found.')
          } else logger.error('cardStore.toGroupAddId group:', group, 'not found.')
        } else {
          // create group with the card
          let cardIndex = methodState.cards.findIndex(card => card._id === id)
          if (cardIndex >= 0) {
            methodState.cards[cardIndex] = {
              _id: cardIndex + '-' + Date.now().toString(36),
              cards: [methodState.cards[cardIndex]],
            }
            dispatch({ iteration: methodState.iteration + 1 }) //cards: methodState.cards })
            return
          }
          logger.error('cardStore.toGroupAddId id:', id, 'not found.')
        }
      },
      fromGroupRemoveId(group, id) {
        const groupIndex = methodState.cards.findIndex(crd => crd.cards && crd._id === group)
        if (groupIndex => 0) {
          let cardIndex = methodState.cards[groupIndex].cards.findIndex(crd => crd._id === id)
          if (cardIndex >= 0) {
            let subCards = methodState.cards[groupIndex].cards
            let card = subCards[cardIndex]
            subCards.splice(cardIndex, 1)
            let cards = methodState.cards
            if (subCards.length) {
              // there are still cards
              cards.splice(groupIndex + 1, 0, card)
            } else cards[groupIndex] = card
            dispatch({ iteration: methodState.iteration + 1 })
            return
          } else logger.error('cardStore.fromGroupRemoveId group:', groupIndex, 'id: ', id, 'not found')
        } else logger.error('cardStore.fromGroupRemoveId group:', groupIndex, 'not found')
      },
      changeLead(group, id) {
        const groupIndex = methodState.cards.findIndex(crd => crd.cards && crd._id === group)
        let cardIndex = methodState.cards[groupIndex].cards.findIndex(card => card._id === id)
        if (groupIndex >= 0 && cardIndex >= 0) {
          let cards = methodState.cards
          let card = cards[groupIndex].cards[cardIndex]
          let cardStack = cards[groupIndex].cards
          cardStack.splice(cardIndex, 1)
          cardStack.unshift(card)
          dispatch({ iteration: methodState.iteration + 1 }) // we havent really changeed cards - we just mutated it
          return
        } else logger.error('cardStore.changeLead group:', groupIndex, 'id:', id, 'not found')
      },
    }
  }, initialState)

  return React.cloneElement(React.Children.only(children), { ...otherProps, cardStore: { methodState, methods } })
}

export default CardStore
/*
Usage would look like this
<CardStore cards={[{_id: "abc123", description: "this is a card"},{_id: "abc124", description: "this is also a card"}]} >
    <ComponentListSlider>
        <StartPage />
        <Ask />
        <CardListGrouper/>
        <CardListSelector/>
    </ComponentListSlider>
</CardStore>

CardsStore.cards[]

*/
