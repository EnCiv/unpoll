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
            fromGroupRemoveId(group, id) {
                // before removing the id, check if we are ending the grouping
                const groupIndex = methodState.cards.findIndex(crd => crd.cards && crd._id === group)
                if (methodState.cards[groupIndex].cards.length <= 1)
                    dispatch({ group: '' })
                methods.fromGroupRemoveId(group, id)
            },
            toggleSelect(id) {
                if (!lState.group) {
                    methods.toGroupAddId('', id)
                    dispatch({ group: methodState.cards.find(crd => crd.cards && crd.cards[0]._id === id)?._id })
                } else
                    methods.toGroupAddId(lState.group, id)
            },
            resetGroup() {
                dispatch({ group: '' })
            }
        }
    ), { group: '' })

    const [groupMethods, neverSetGroupMethods] = useState(() => Object.assign({}, methods, lMethods))

    const classes = useStyles(props)

    return (
        <div className={cx(className, classes.list)} style={style} >
            {methodState.cards.map(card => {
                if (card.cards)
                    if (card.cards.length)
                        return (
                            <CardStack
                                className={classes.topic}
                                key={card._id}
                                cardStore={cardStore}
                                group={card._id}
                                defaultShape={"add-remove"}
                                groupMethods={groupMethods}
                                iteration={methodState.iteration}
                                cards={card.cards}
                            />
                        )
                    else return null
                else
                    return <TopicCard topicObj={card} className={classes.topic} key={card._id}
                        onToggleSelect={lMethods.toggleSelect}
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
