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

function isCardInCards(card, cards) {
  for (const crd of cards) {
    if (crd.cards) {
      if (isCardInCards(card, crd.cards)) return true
    } else {
      if (card._id === crd._id) return true
    }
  }
  return false
}
export const CardStore = props => {
  const { children, initialState, ...otherProps } = props
  if (!initialState.iteration) initialState.iteration = 0
  const [prev, neverSetPrev] = useState({ initialState })

  const [methodState, methods] = useMethods((dispatch, methodState) => {
    return {
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

  if (initialState !== prev.initialState) {
    // initial state has changed, we need to mutate the current state of cards to match
    prev.initialState = initialState
    if (fromCardsRemoveIfNotInKeepers(methodState.cards, initialState.cards)) methodState.iteration += 1
    for (const card of initialState.cards) {
      if (!isCardInCards(card, methodState.cards)) {
        methodState.cards.push(card)
        methodState.iteration += 1 // don't need to dispatch this because we don't need to cause another rerender
      }
    }
  }

  //return React.cloneElement(React.Children.only(children), { ...otherProps, cardStore: { methodState, methods } })
  return React.Children.map(children, child =>
    React.cloneElement(child, { ...otherProps, cardStore: { methodState, methods } })
  )
}

function fromCardsRemoveIfNotInKeepers(cards, keepers) {
  let changed = 0
  let toBeRemoved = []
  cards.forEach((card, i) => {
    if (card.cards) {
      let innerToBeRemoved = []
      card.cards.forEach((innerCard, j) => {
        if (!keepers.some(crd => crd._id === innerCard._id)) innerToBeRemoved.push(j)
        changed += 1
      })
      while (innerToBeRemoved.length) {
        card.cards.splice(innerToBeRemoved.pop(), 1)
      }
      if (card.cards.length === 0) {
        toBeRemoved.push(i)
      } else if (card.cards.length === 1) cards[i] = card.cards[0]
    } else {
      if (!keepers.some(crd => crd._id === card._id)) {
        changed += 1
        toBeRemoved.push(i)
      }
    }
  })
  while (toBeRemoved.length) {
    cards.splice(toBeRemoved.pop(), 1)
  }
  return changed
}
export default CardStore
