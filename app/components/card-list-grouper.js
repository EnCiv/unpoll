'use strict'

// https://github.com/EnCiv/unpoll/issues/15

import React, { useRef, useState, useEffect, useLayoutEffect, useMemo, useReducer } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import CardStack from './card-stack'
import TopicCard from './topic-card'
import ActionCard from './action-card'

export const CardListGrouper = props => {
    const { className, style, cardStore, onDone, ...otherProps } = props
    const { methods, methodState } = cardStore

    const classes = useStyles(props)

    return (
        <div className={cx(className, classes.list)} style={style} >
            {methodState.cards.map(card => {
                if (Array.isArray(card))
                    if (card.length)
                        return (
                            <CardStack
                                className={classes.topic}
                                shape={methodState.group === card[0]._id ? methodState.shape : "minimized"}
                                onShapeChange={methodState.group === card[0]._id ? methods.activeGroupShapeChange : shape => methods.inactiveGroupShapeChange(card[0]._id, shape)}
                                key={card[0]._id}
                                cards={card}
                                refresh={methodState.refresh}
                                grouperMethods={methods}
                            />
                        )
                    else return null
                else
                    return <TopicCard topicObj={card} onToggleSelect={methods.toggleSelect} className={classes.topic} key={card._id} />
            })}
            <ActionCard className={classes.action} active={!methodState.group && "true"} name={methodState.group ? "Complete Group before continuing" : "Continue"} onDone={onDone} />
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
