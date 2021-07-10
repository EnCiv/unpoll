'use strict'

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import CardStack from './card-stack'
import TopicCard from './topic-card'

const Blue = '#418AF9'
const selectedBackgroundColor = Blue // blue
const selectedColor = 'white'
const rootBackgroundColor = '#E5E5E5'

export const CardListSelector = props => {
    const { cards, ...otherProps } = props
    const classes = useStyles(props)
    return (
        <div className={classes.list}>
            {cards.map(card => {
                if (Array.isArray(card))
                    return <div className={classes.topic}><CardStack shape="minimized">
                        {card.map(subCard => (
                            <TopicCard topicObj={subCard} key={subCard._id} />
                        ))}
                    </CardStack></div>
                else
                    return <div className={classes.topic}><TopicCard topicObj={card} key={card._id} /></div>
            })
            }
        </div>
    )
}

const useStyles = createUseStyles({
    list: {
        padding: '1rem'

    },
    topic: {
        borderRadius: '1rem',
        overflow: 'hidden',
        marginTop: '1rem',
        "&:first-child": {
            marginTop: 0
        }
    }
})

export default CardListSelector
