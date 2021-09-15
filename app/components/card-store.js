import React, { useRef, useState, useEffect, useLayoutEffect, useMemo, useReducer } from 'react'


// while "object" state  (a pointer for you C programmers) will change each time, the object state.methodState (meaning the pointer methodState) will always be the same
// this reducer will mutate the contents of the methodState object based on the properties in the object "action'.  So action does not have a type like it would in other cases.
// reducer will retun a new state but with the same methodState object - though it will be mutated 
function reducer(state, action) {
    Object.assign(state.methodState, action)
    return { ...state }
}

function useMethods(methodsObj, initialState) {
    // useReducer returns a new pointer to "state" every time state changes, but it always returns the same value for dispatch
    const [state, dispatch] = useReducer(reducer, { methodState: initialState })

    // these methods (the code) are setup once. They will always refer to the original "state" pointer that was returned by the very first useReducer call.
    // but because our "state" has "methodState" in it, and our reducer always mutates that object (rather then setting methodState= it uses objectAssign(methodState))
    // these "memorized" methods will be able to access the latest *methodState* as it changes
    // memorizing these methods saves times and reduces rerendering of components
    // writing code with methods is less work and less error prone than doing dispatch({type: "xxx"}) everywhere

    const methodState = state.methodState // now you don't have to say state.methodState everywhere

    const [methods, neverSetMethods] = useState(() => methodsObj(dispatch, methodState))

    methods.reset = function () {
        // reset the methodState back to initialState by mutating the original object.  
        // don't create a new object, becasue the methosObjs were instantiated to work with the original state.methodState object.
        Object.keys(state.methodState).forEach(key => { delete state.methodState[key] })
        Object.assign(state.methodState, initialState)
        dispatch({})
    }

    // methodsObj is a function that returns an object of methods - because we need to pass dispatch to it.  Passing methodState doesn't hurt

    return [methodState, methods]
}

const maybeDemoteGroupInCards = (methodState) => {
    let cards = methodState.cards
    let id = methodState.group
    let groupIndex = cards.findIndex(crd => Array.isArray(crd) && crd[0]._id === id)
    if (groupIndex >= 0 && Array.isArray(cards[groupIndex]) && cards[groupIndex].length === 1) {
        // if the array has only 1 then change it back
        cards[groupIndex] = cards[groupIndex][0]
        return { cards }
    } else return {}
}

export const CardStore = props => {
    console.info("CardStore", props)
    const { children, cards, ...otherProps } = props

    const initialState = { group: '', refresh: 0, shape: "minimized", cards: props.cards.slice() }

    const [methodState, methods] = useMethods(
        (dispatch, methodState) => {
            return (
                {
                    toggleSelect(id) {
                        let cards = methodState.cards
                        if (methodState.group) {
                            if (methodState.group !== id) {
                                let index = cards.findIndex(card => card._id === id)
                                if (index >= 0) {
                                    let card = cards[index]
                                    cards.splice(index, 1)
                                    let groupIndex = cards.findIndex(crd => Array.isArray(crd) && crd[0]._id === methodState.group)
                                    if (groupIndex >= 0) {
                                        cards[groupIndex].push(card)
                                        dispatch({ cards, refresh: methodState.refresh + 1 })
                                        return
                                    } else
                                        return
                                } else
                                    return
                            } else {
                                dispatch({ ...maybeDemoteGroupInCards(methodState), group: '', shape: "minimized" })
                                return
                            }
                        } else {
                            let index = cards.findIndex(card => card._id === id)
                            if (index >= 0) {
                                if (!Array.isArray(cards[index])) {
                                    cards[index] = [cards[index]]
                                    dispatch({ cards, refresh: methodState.refresh + 1, group: id, shape: "add-remove" })
                                    return
                                } else {
                                    dispatch({ group: id, shape: "add-remove" })
                                    return
                                }
                            } else
                                return
                        }
                    },
                    activeGroupShapeChange(shape) {
                        if (shape === 'minimized') {
                            dispatch({ ...maybeDemoteGroupInCards(methodState), group: '', shape })
                        } else {
                            dispatch({ shape })
                        }
                    },
                    inactiveGroupShapeChange(group, shape) {
                        if (shape != 'minimized')
                            dispatch({ group })
                        else
                            dispatch({ group: '' })
                    },
                    catchEjectedCard(card) {
                        // put the ejected child right below the group it was ejected from - or at the end of the list
                        let cards = methodState.cards
                        let groupIndex = methodState.group && (cards.findIndex(card => Array.isArray(card) && (card.length === 0 || card[0]._id === methodState.group)) + 1) || cards.length
                        cards.splice(groupIndex, 0, card)
                        let emptyChildIndex = cards.findIndex(card => Array.isArray(card) && !card.length)
                        if (emptyChildIndex >= 0) cards.splice(emptyChildIndex, 1)
                        dispatch({ cards, refresh: methodState.refresh + 1, group: card._id === methodState.group ? '' : methodState.group })
                    }
                })
        },
        initialState)

    return React.cloneElement(React.Children.only(children), { ...otherProps, cardStore: { methodState, methods } })
}

export default CardStore
/*

<CardStore >
    <ComponentListSlider>
        <StartPage />
        <Ask />
        <CardListGrouper/>
        <CardListSelector/>
    </ComponentListSlider>
</CardStore>

CardsStore.cards[]

*/