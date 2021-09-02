'use strict'

// https://github.com/EnCiv/unpoll/issues/15

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import CardStack from './card-stack'
import TopicCard from './topic-card'
import ActionCard from './action-card'

export const CardListGrouper = props => {
    const { className, style, cards, selectedIds, maxSelected = 2, onDone, ...otherProps } = props
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
        if (group && !changeLeadTopic) {
            let groupIndex = cards.findIndex(crd => Array.isArray(crd) && crd[0]._id === group)
            let subChildIndex = cards[groupIndex].findIndex(card => card._id === id)
            if (subChildIndex >= 0) {
                let card = cards[groupIndex][subChildIndex]
                cards[groupIndex].splice(subChildIndex, 1)
                cards.push(card)
            }
            setRefresh(refresh + 1) // have to redraw
        } else if (group && changeLeadTopic) {
            let groupIndex = cards.findIndex(crd => Array.isArray(crd) && crd[0]._id === group)
            let subChildIndex = cards[groupIndex].findIndex(card => card._id === id)
            if (subChildIndex >= 0) {
                let card = cards[groupIndex][subChildIndex]
                cards[groupIndex].splice(subChildIndex, 1)
                cards[groupIndex].unshift(card)
                setGroup(card._id)
            }
            setRefresh(refresh + 1) // have to redraw
            setChangeLeadTopic(false)
        }
    }
    const catchEjectedSubChild = (child) => {
        cards.push(child)
        setRefresh(refresh + 1) // have to redraw
        let emptyChildIndex = cards.findIndex(card => Array.isArray(card) && !card.length)
        if (emptyChildIndex >= 0) cards.splice(emptyChildIndex, 1)
        if (child._id === group)
            setGroup('')
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
    const [changeLeadTopic, setChangeLeadTopic] = useState(false)
    return (
        <div className={cx(className, classes.list)} style={style} >
            {cards.map(card => {
                if (Array.isArray(card))
                    return (
                        <CardStack
                            className={classes.topic}
                            shape={group === card[0]._id ? "add-remove" : "minimized"}
                            onShapeChange={group === card[0]._id ? activeGroupShapeChange : shape => inactiveGroupShapeChange(card[0]._id, shape)}
                            key={card[0]._id}
                            onChangeLeadTopic={() => setChangeLeadTopic(!changeLeadTopic)}
                            cards={card}
                            refresh={refresh}
                            reducer={(action) => catchEjectedSubChild(action.card)}
                        />
                    )
                else
                    return <TopicCard topicObj={card} onToggleSelect={toggleSelect} className={classes.topic} key={card._id} />
            })}
            <ActionCard className={classes.action} active={!group && "true"} name={group ? "Complete Group before continuing" : "Continue"} onDone={onDone} />
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
