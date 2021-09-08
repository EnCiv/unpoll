'use strict'

// https://github.com/EnCiv/unpoll/issues/15

import React, { useRef, useState, useEffect, useLayoutEffect, useMemo, useReducer } from 'react'
import { createUseStyles } from 'react-jss'
import { useMethods } from 'react-use'
import cx from 'classnames'
import CardStack from './card-stack'
import TopicCard from './topic-card'
import ActionCard from './action-card'

export const CardListGrouper = props => {
    const { className, style, cards, selectedIds, maxSelected = 2, onDone, ...otherProps } = props

    const maybeDemoteGroup = (id) => {
        let groupIndex = cards.findIndex(crd => Array.isArray(crd) && crd[0]._id === id)
        if (groupIndex >= 0 && Array.isArray(cards[groupIndex]) && cards[groupIndex].length === 1) {
            // if the array has only 1 then change it back
            cards[groupIndex] = cards[groupIndex][0]
        }
    }


    // while "object" state  (a pointer for you C programmers) will change each time, the object state.methodState (meaning the pointer methodState) will always be the same
    // reducer will mutate the contents of methodState object based on the properties in the object "action'.  So action does not have a type like it would in other cases.
    // reducer will retun a new state but with the same methodState object - though it will be mutated 
    function reducer(state, action) {
        Object.assign(state.methodState, action)
        return { ...state }
    }

    // use reducer returns a new pointer to "state" every time state changes, but it always returns the same value for dispatch
    const [state, dispatch] = useReducer(reducer, { methodState: { group: '', refresh: 0 } })

    // these methods (the code) are set once. They will always refer to the original "state" pointer that was returned by the very first useReducer call.
    // but because our "state" has "methodState" in it, and our reducer always mutates that value (rather then setting methodState= it uses objectAssign(methodState))
    // these "memorized" methods will be able to access the state as it changes
    // memorizing these methods saves times and reduces rerendering of components

    const methodState = state.methodState // now you don't have to say state.methodState everywhere
    const [methods, neverSetMethods] = useState(
        {
            toggleSelect(id) {
                if (methodState.group) {
                    if (methodState.group !== id) {
                        let index = cards.findIndex(card => card._id === id)
                        if (index >= 0) {
                            let card = cards[index]
                            cards.splice(index, 1)
                            let groupIndex = cards.findIndex(crd => Array.isArray(crd) && crd[0]._id === state.methodState.group)
                            if (groupIndex >= 0) {
                                cards[groupIndex].push(card)
                                dispatch({ refresh: state.methodState.refresh + 1 })
                                return
                            } else
                                return
                        } else
                            return
                    } else {
                        maybeDemoteGroup(state.methodState.group)
                        dispatch({ group: '' })
                        return
                    }
                } else {
                    let index = cards.findIndex(card => card._id === id)
                    if (index >= 0) {
                        if (!Array.isArray(cards[index]))
                            cards[index] = [cards[index]]
                    }
                    dispatch({ group: id })
                    return
                }
            },
            refresh() {
                dispatch({ refresh: state.methodState.refresh + 1 })
            },
            activeGroupShapeChange(shape) {
                if (shape === 'minimized') maybeDemoteGroup(state.methodState.group)
                dispatch({ group: '' })
            },
            inactiveGroupShapeChange(group, shape) {
                if (shape != 'minimized')
                    dispatch({ group })
                else
                    dispatch({ group: '' })
            },
            onChangeLeadTopic() {
                dispatch({ refresh: state.methodState.refresh + 1 })
            },
            catchEjectedCard(card) {
                // put the ejected child right below the group it was ejected from - or at the end of the list
                let groupIndex = state.methodState.group && (cards.findIndex(card => Array.isArray(card) && (card.length === 0 || card[0]._id === state.methodState.group)) + 1) || cards.length
                cards.splice(groupIndex, 0, card)
                let emptyChildIndex = cards.findIndex(card => Array.isArray(card) && !card.length)
                if (emptyChildIndex >= 0) cards.splice(emptyChildIndex, 1)
                dispatch({ refresh: state.methodState.refresh + 1, group: card._id === state.methodState.group ? '' : state.methodState.group })
            }
        })


    const classes = useStyles(props)

    return (
        <div className={cx(className, classes.list)} style={style} >
            {cards.map(card => {
                if (Array.isArray(card))
                    if (card.length)
                        return (
                            <CardStack
                                className={classes.topic}
                                shape={state.methodState.group === card[0]._id ? "add-remove" : "minimized"}
                                onShapeChange={state.methodState.group === card[0]._id ? methods.activeGroupShapeChange : shape => methods.inactiveGroupShapeChange(card[0]._id, shape)}
                                key={card[0]._id}
                                onChangeLeadTopic={methods.onChangeLeadTopic}
                                cards={card}
                                refresh={state.methodState.refresh}
                                reducer={(action) => methods.catchEjectedCard(action.card)}
                            />
                        )
                    else return null
                else
                    return <TopicCard topicObj={card} onToggleSelect={methods.toggleSelect} className={classes.topic} key={card._id} />
            })}
            <ActionCard className={classes.action} active={!state.methodState.group && "true"} name={state.methodState.group ? "Complete Group before continuing" : "Continue"} onDone={onDone} />
        </div>
    )
}

const useStyles = createUseStyles({
    list: {
        padding: '1rem'

    },
    topic: {
        position: 'relative',
        borderRadius: '1rem',
        overflow: 'hidden',
        marginTop: '1rem',
        "&:first-child": {
            marginTop: 0
        }
    },
    action: {
        marginTop: '1rem'
    }
})

export default CardListGrouper
