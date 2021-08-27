'use strict'

// See https://github.com/EnCiv/unpoll/issues/15

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import CardStack from './card-stack'
import TopicCard from './topic-card'

export const CardListGrouper = props => {
    const { cards, selectedIds, maxSelected = 2, onDone, ...otherProps } = props
    const [group, setGroup] = useState('')
    const [refresh, setRefresh] = useState(0) // some events need to cause a rerender

    const classes = useStyles(props)
    const toggleSelect = (id) => {
        if (group) {
            if (group !== id) {
                let index = cards.findIndex(card => card._id === id)
                if (index >= 0) {
                    let card = cards[index]
                    cards.splice(index, 1)
                    let groupIndex = cards.findIndex(crd => Array.isArray(crd) && crd[0]._id === group)
                    if (groupIndex >= 0) {
                        cards[groupIndex].push(card)
                        setRefresh(refresh + 1)
                    }
                }
            } else {
                maybeDemoteGroup(group)
                setGroup('')
            }
        } else {
            setGroup(id)
            let index = cards.findIndex(card => card._id === id)
            if (index >= 0) {
                if (!Array.isArray(cards[index]))
                    cards[index] = [cards[index]]
            }

        }
    }
    const subChildToggle = (id) => {
        if (group) {
            let groupIndex = cards.findIndex(crd => Array.isArray(crd) && crd[0]._id === group)
            let subChildIndex = cards[groupIndex].findIndex(card => card._id === id)
            if (subChildIndex >= 0) {
                let card = cards[groupIndex][subChildIndex]
                cards[groupIndex].splice(subChildIndex, 1)
                cards.push(card)
            }
            setRefresh(refresh + 1) // have to redraw
        }
    }
    const activeGroupShapeChange = shape => {
        if (shape === 'minimized') maybeDemoteGroup(group)
        setGroup('')
    }
    const maybeDemoteGroup = (id) => {
        let groupIndex = cards.findIndex(crd => Array.isArray(crd) && crd[0]._id === id)
        if (groupIndex >= 0 && Array.isArray(cards[groupIndex]) && cards[groupIndex].length === 1) {
            // if the array has only 1 then change it back
            cards[groupIndex] = cards[groupIndex][0]
        }
    }
    const inactiveGroupShapeChange = (group, shape) => {
        if (shape != 'minimized')
            setGroup(group)
        else
            setGroup('')
    }
    return (
        <>
            <div className={classes.list} key="card-list">
                {cards.map(card => {
                    if (Array.isArray(card))
                        return <div className={classes.topic} key={card[0]._id + 'array'}>
                            <CardStack shape={group === card[0]._id ? "normal" : "minimized"} onShapeChange={group === card[0]._id ? activeGroupShapeChange : shape => inactiveGroupShapeChange(card[0]._id, shape)}>
                                {card.map((subCard, i) => (
                                    <TopicCard topicObj={subCard} key={subCard._id} onToggleSelect={i === 0 ? toggleSelect : subChildToggle} />
                                ))}
                            </CardStack>
                        </div>
                    else
                        return <div className={classes.topic} key={card._id}>
                            <TopicCard topicObj={card} onToggleSelect={toggleSelect} key={'clickable' + card._id} />
                        </div>
                })
                }
            </div>
        </>
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
    }
})

export default CardListGrouper
