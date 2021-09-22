import React, { useRef, useState, useEffect, useLayoutEffect, useMemo, useReducer } from 'react'

import useMethods from '../lib/use-methods'

export const CardStore = props => {
    const { children, defaultValue, ...otherProps } = props
    const initialState = { cards: props.defaultValue.slice(), iteration: 0 }

    const [methodState, methods] = useMethods(
        (dispatch, methodState) => {
            return (
                {
                    toGroupAddId(group, id) {
                        const groupIndex = methodState.cards.findIndex(crd => Array.isArray(crd) && crd[0]._id === group)
                        if (groupIndex >= 0) {
                            if (groupIndex >= 0) {
                                let cardIndex = methodState.cards.findIndex(crd => crd._id === id)
                                if (cardIndex >= 0) {
                                    let cards = methodState.cards//.slice() // make a copy
                                    let card = cards[cardIndex]
                                    //cards[groupIndex] = cards[groupIndex].slice()
                                    cards[groupIndex].push(card) // a copy so that components will know it's changed
                                    cards.splice(cardIndex, 1) // remove card from list after manipulation because removing will change index
                                    dispatch({ cards, iteration: methodState.iteration + 1 })
                                    return
                                } else logger.error("cardStore.toGroupAddId id:", id, "not found.")
                            } else logger.error("cardStore.toGroupAddId group:", group, "not found.")
                        } else { // create group with the card 
                            let cardIndex = methodState.cards.findIndex(card => card._id === id)
                            if (cardIndex >= 0) {
                                methodState.cards[cardIndex] = [methodState.cards[cardIndex]]
                                dispatch({ iteration: methodState.iteration + 1 }) //cards: methodState.cards })
                                return
                            } logger.error("cardStore.toGroupAddId id:", id, "not found.")
                        }
                    },
                    fromGroupRemoveId(group, id) {
                        const groupIndex = methodState.cards.findIndex(crd => Array.isArray(crd) && crd[0]._id === group)
                        if (groupIndex => 0) {
                            let cardIndex = methodState.cards[groupIndex].findIndex(crd => crd._id === id)
                            if (cardIndex >= 0) {
                                let subCards = methodState.cards[groupIndex]//.slice()
                                let card = subCards[cardIndex]
                                subCards.splice(cardIndex, 1)
                                let cards = methodState.cards //.slice()
                                if (subCards.length) {// there are still cards
                                    //cards[groupIndex] = subCards
                                    cards.splice(groupIndex + 1, 0, card)
                                } else
                                    cards[groupIndex] = card
                                dispatch({ cards, iteration: methodState.iteration + 1 })
                                return
                            } else logger.error("cardStore.fromGroupRemoveId group:", groupIndex, "id: ", id, "not found")
                        } else logger.error("cardStore.fromGroupRemoveId group:", groupIndex, "not found")
                    },
                    changeLead(group, id) {
                        const groupIndex = methodState.cards.findIndex(crd => Array.isArray(crd) && crd[0]._id === group)
                        let cardIndex = methodState.cards[groupIndex].findIndex(card => card._id === id)
                        if (groupIndex >= 0 && cardIndex >= 0) {
                            let cards = methodState.cards
                            let card = cards[groupIndex][cardIndex]
                            let cardStack = cards[groupIndex]//.slice()
                            cardStack.splice(cardIndex, 1)
                            cardStack.unshift(card)
                            //cards[groupIndex] = cardStack
                            dispatch({ cards, iteration: methodState.iteration + 1 }) // we havent really changeed cards - we just mutated it
                            return
                        } else logger.error("cardStore.changeLead group:", groupIndex, "id:", id, "not found")
                    }
                })
        },
        initialState)

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