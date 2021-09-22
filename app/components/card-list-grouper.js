'use strict'

// https://github.com/EnCiv/unpoll/issues/15

import React, { useRef, useState, useEffect, useLayoutEffect, useMemo, useReducer } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import CardStack from './card-stack'
import TopicCard from './topic-card'
import ActionCard from './action-card'
import useMethods from '../lib/use-methods'

export const CardListGrouper = props => {
    const { className, style, cardStore, onDone, ...otherProps } = props
    const { methods, methodState } = cardStore

    const [lState, lMethods] = useMethods((dispatch, lState) => (
        {
            setGroup(id) {
                dispatch({ group: id })
            },
            resetGroup() {
                dispatch({ group: '' })
            },
            fromGroupRemoveId(group, id) {
                // before removing the id, check if we are ending the grouping
                const groupIndex = methodState.cards.findIndex(crd => Array.isArray(crd) && crd[0]._id === group)
                if (id === group) {
                    if (methodState.cards[groupIndex].length > 1) {
                        dispatch({ group: methodState.cards[groupIndex][1]._id })
                    } else {
                        dispatch({ group: '' })
                    }
                }
                methods.fromGroupRemoveId(group, id)
            },
            changeLead(group, id) {
                dispatch({ group: id })
                methods.changeLead(group, id)
            }
        }
    ), { group: '' })

    const [groupMethods, neverSetGroupMethods] = useState(() => Object.assign({}, methods, lMethods))

    const classes = useStyles(props)

    const toggleSelect = (id) => {
        if (!lState.group) {
            lMethods.setGroup(id)
            methods.toGroupAddId('', id)
        } else
            methods.toGroupAddId(lState.group, id)
    }

    return (
        <div className={cx(className, classes.list)} style={style} >
            {methodState.cards.map((card, cardIndex) => {
                if (Array.isArray(card))
                    if (card.length)
                        return (
                            <CardStack
                                className={classes.topic}
                                key={card[0]._id}
                                cardStore={cardStore}
                                group={card[0]._id}
                                defaultShape={"add-remove"}
                                groupMethods={groupMethods}
                                iteration={methodState.iteration}
                            />
                        )
                    else return null
                else
                    return <TopicCard topicObj={card} className={classes.topic} key={card._id}
                        onToggleSelect={toggleSelect}
                    />
            })}
            <ActionCard className={classes.action} active={!lState.group && "true"} name={lState.group ? "Complete Group before continuing" : "Continue"} onDone={onDone} />
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
